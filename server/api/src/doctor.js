const neo4j = require('../config/neo4j');
const firebase = require('../config/firebase');
const zipcodes = require('zipcodes');
const _ = require('lodash');

function parseDoctorData(doctor) {
  const provider = doctor.doctor.properties || doctor.doctor;
  let bundles = [];

  doctor.packages = doctor.packages.map((item) => { // eslint-disable-line
    const p = item.properties;
    const pack = {
      ...p,
      min_price: JSON.parse(p.min_price),
      max_price: JSON.parse(p.max_price),
      discount: JSON.parse(p.discount),
      consult_price: JSON.parse(p.consult_price),
      total: JSON.parse(p.total),
      tax: JSON.parse(p.tax),
    };

    pack.consult_price.unit += (process.env.APPLICATION_FEE || 50) * 1;
    pack.tax.unit += (process.env.APPLICATION_FEE || 50) * 1;
    pack.min_price.unit += (process.env.APPLICATION_FEE || 50) * 1;
    pack.max_price.unit += (process.env.APPLICATION_FEE || 50) * 1;
    pack.consult_price.unit += (process.env.APPLICATION_FEE || 50) * 1;
    pack.total.unit += (process.env.APPLICATION_FEE || 50) * 1;

    return pack;
  });

  if (doctor.packages) {
    bundles = _.sortBy(doctor.packages, (bundle) => {
      const price = bundle.min_price.unit;
      return price;
    });

    provider.lowest_consultation_price = bundles[0].min_price.unit;
  }

  // education
  const education = [];
  if (provider.education) {
    provider.education.forEach((v) => {
      education.push(JSON.parse(v));
    });
  }
  // videos
  const videos = [];
  if (provider.videos) {
    provider.videos.forEach((v) => {
      videos.push(JSON.parse(v));
    });
  }
  // images
  const images = [];
  if (provider.images) {
    provider.images.forEach((v) => {
      images.push(JSON.parse(v));
    });
  }
  // articles
  const articles = [];
  if (provider.articles) {
    provider.articles.forEach((v) => {
      articles.push(JSON.parse(v));
    });
  }
  // hospital_affiliates
  const hospitalAffiliates = [];
  if (provider.hospital_affiliates) {
    provider.hospital_affiliates.forEach((v) => {
      try {
        hospitalAffiliates.push(JSON.parse(v));
      } catch (e) {
        hospitalAffiliates.push(v);
      }
    });
  }
  // board_certifications
  const boardCertifications = [];
  if (provider.board_certifications) {
    provider.board_certifications.forEach((v) => {
      try {
        boardCertifications.push(JSON.parse(v));
      } catch (e) {
        boardCertifications.push(v);
      }
    });
  }

  // memberships
  const memberships = [];
  if (provider.memberships) {
    provider.memberships.forEach((v) => {
      try {
        memberships.push(JSON.parse(v));
      } catch (e) {
        // do nothing
      }
    });
  }

  const reviewList = [];
  if (provider.review_list) {
    provider.review_list.forEach((v) => {
      try {
        reviewList.push(JSON.parse(v));
      } catch (e) {
        // do nothing
      }
    });
  }

  const imageAvatar = provider.image_avatar ? JSON.parse(provider.image_avatar) : '';
  const imageMain = provider.image_main ? JSON.parse(provider.image_main) : '';

  const publications = [];
  if (Array.isArray(provider.media_publications) && provider.media_publications.length > 0 && provider.media_publications[0].length > 0) {
    provider.media_publications.forEach((v) => {
      try {
        publications.push(JSON.parse(v));
      } catch (e) {
        // do nothing
      }
    });
  }

  provider.review_list = reviewList;
  provider.awards = (provider.awards || []).map((x) => JSON.parse(x));
  provider.qa_list = (provider.qa_list || []).map((x) => JSON.parse(x));
  provider.travels = (provider.travels || []).map((x) => JSON.parse(x));
  provider.image_avatar = imageAvatar;
  provider.image_main = imageMain;
  provider.bundles = bundles;
  provider.education = education;
  provider.videos = videos;
  provider.images = images;
  provider.articles = articles;
  provider.hospital_affiliates = hospitalAffiliates;
  provider.board_certifications = boardCertifications;
  provider.memberships = memberships;
  provider.media_publications = publications;
  provider.paid = parseInt(provider.paid, 10) === 1;
  if (provider.paid && provider.canonical_name) {
    provider.uuid = provider.canonical_name;
  }

  return provider;
}

module.exports = {
  getDoctor(payload) {
    return new Promise((resolve, reject) => {
      const { uuid } = payload;
      if (uuid === undefined || uuid === null) {
        reject(new Error('Data was not provided'));
      }
      const session = neo4j.session();

      const statement = `MATCH (provider:Provider)<-[:BUNDLE]-(c:Bundle)
        WHERE provider.uuid = '${uuid}' OR provider.canonical_name = '${uuid}'
        WITH {doctor: provider, packages: collect(c)} as doctor
        RETURN doctor`;

      const readDataPromise = session.readTransaction((trx) => trx.run(statement));
      readDataPromise.then((result) => {
        const record = result.records[0];
        if (record === undefined) {
          reject(new Error('not found'));
        } else {
          const doctor = record.get('doctor');
          session.close();
          const provider = parseDoctorData(doctor);

          resolve(provider);
        }
      }).catch((error) => {
        session.close();
        reject(error);
      });
    });
  },
  isClaimed(profileId) {
    return firebase.databaseRef
      .ref()
      .child('profiles^users')
      .child(profileId)
      .once('value')
      .then((snap) => !!snap.val());
  },
  getDoctorsSearch(payload) {
    return new Promise((resolve, reject) => {
      if (!payload) {
        reject(new Error('Data was not provided'));
      }
      const {
        q,
        zip,
        joint,
        radius,
        from,
        limit,
        showOnHome,
      } = payload;
      const session = neo4j.session();
      let keyword = joint;
      if (joint === undefined || joint.length <= 0) {
        keyword = 'all';
      }

      const skip = (from === undefined ? 0 : from);
      const lim = (limit === undefined ? 100 : limit);
      const tx = session.beginTransaction();
      const responseObject = {
        doctors: [],
        preferredProviders: [],
      };

      let success = true;
      const showHomeMatch = showOnHome ? ' doctors.priority <= 3' : '1 = 1';
      const keywordMatch = keyword === 'all' ? '' : `:${_.capitalize(keyword.toLowerCase())}`;
      let zipMatch = '1 = 1';
      let zipList = [];
      let qMatch = '1 = 1';
      const homeFields = [
        'uuid',
        'canonical_name',
        'photo_url',
        'title',
        'name',
        'specialties',
        'rating',
        'reviews',
        'latitude',
        'longitude',
        'street',
        'review_list',
        'experience',
        'city',
        'state',
        'country',
        'specialities',
        'paid',
        'priority',
        'phone',
        'about',
        'conditions_treated',
        'lowest_consultation_price',
      ];
      const listFields = [
        'uuid',
        'canonical_name',
        'photo_url',
        'name',
        'city',
        'state',
        'title',
        'practice_name',
        'about',
        'rating',
        'paid',
        'priority',
        'reviews',
        'lowest_consultation_price',
      ];

      const fields = showOnHome ? homeFields : listFields;
      const fieldsStr = fields.map((f) => `${f}: doctors.${f}`).join(', ');
      const withDoctors = `{${fieldsStr}}`;

      if (q) {
        qMatch = `(toLower(doctors.name) =~ ".*${q}.*" OR "${q}" in doctors.procedures_performed)`;
      }

      if (zip) {
        const radiusInt = Number(radius || 25);
        zipList = zipcodes.radius(Number(zip), radiusInt);
        zipMatch = 'toString(doctors.zip) IN {zipList}';
      }

      const statement = `MATCH (doctors:Provider${keywordMatch})
              WHERE ${zipMatch} AND ${showHomeMatch} AND ${qMatch}
              WITH doctors, rand() as r
              ORDER BY toInteger(doctors.paid) DESC, r
              SKIP ${skip} LIMIT ${lim}
              OPTIONAL MATCH (doctors)<-[:BUNDLE]->(c:Bundle)
              WITH {doctor: ${withDoctors}, packages:collect(c)} as newDoctorList
              RETURN newDoctorList`;

      tx.run(statement, { zipList }).subscribe({
        onNext(result) {
          const doctor = result.get('newDoctorList');
          const provider = parseDoctorData(doctor);
          const doc = {
            doctor: provider,
            packages: [],
          };

          doctor.packages.forEach((p) => {
            doc.packages.push(p.properties);
          });

          responseObject.doctors.push(doc);
        },
        onCompleted() {
          success = true;
        },
        onError(error) {
          reject(error);
        },
      });

      if (success) {
        tx.commit().subscribe({
          onCompleted() {
            responseObject.doctors = _.sortBy(responseObject.doctors, 'doctor.priority');
            const finalResponseObject = {
              providers: responseObject.doctors, // shuffle main list
              preferredProviders: responseObject.doctors.slice(0, 6), // shuffle preferred list
            };
            // cache.set(cacheKey, { result: finalResponseObject }, 120); // set cache
            resolve(finalResponseObject);
            session.close();
          },
          onError(error) {
            tx.rollback();
            session.close();
            reject(error);
          },
        });
      } else {
        reject(new Error('error'));
        tx.rollback();
      }
    });
  },
  getPreferredDoctorsSearch(payload) {
    return new Promise((resolve, reject) => {
      if (!payload) {
        reject(new Error('Data was not provided'));
      }
      const {
        zip,
        joint,
        radius,
        from,
        limit,
        showOnHome,
      } = payload;
      const session = neo4j.session();
      let keyword = joint;
      if (joint === undefined || joint.length <= 0) {
        keyword = 'knee';
      }

      const showHomeMatch = showOnHome ? 'doctors.priority <= 3' : '1 = 1';
      const keywordMatch = keyword === 'all' ? '' : `:${_.capitalize(keyword.toLowerCase())}`;
      const skip = (from === undefined ? 0 : from);
      const lim = (limit === undefined ? 200 : limit);
      const tx = session.beginTransaction();
      const responseObject = {
        doctors: [],
      };

      let success = true;

      if (zip) {
        const radiusInt = Number(radius || 25);
        const zipList = zipcodes.radius(Number(zip), radiusInt);
        const addressCheck = [];

        const statement = `MATCH (doctors:Provider${keywordMatch})
          WHERE ${showHomeMatch} AND toString(doctors.zip) IN {zipList} AND doctors.paid = 1
          WITH doctors ORDER BY doctors.priority SKIP ${skip} LIMIT ${lim}
          OPTIONAL MATCH (doctors)<-[:BUNDLE]-(c:Bundle)
          WITH {doctor: doctors, packages:collect(c)} as newDoctorList
          RETURN newDoctorList`;

        tx.run(statement, { zipList }).subscribe({
          onNext(result) {
            const doctor = result.get('newDoctorList');
            const provider = parseDoctorData(doctor);

            const doc = {
              doctor: provider,
              packages: [],
            };

            doctor.packages.forEach((p) => {
              doc.packages.push(p.properties);
            });

            if (addressCheck.includes(provider.street) === false) {
              addressCheck.push(provider.street);
              responseObject.doctors.push(doc);
            }

            // responseObject.doctors.push(doc)
          },
          onCompleted() {
            success = true;
          },
          onError(error) {
            reject(error);
          },
        });
      } else {
        const statement = `MATCH (doctors:Provider)
          WHERE ${showHomeMatch} AND doctors.paid = 1
          WITH doctors ORDER BY doctors.priority SKIP ${skip} LIMIT ${lim}
          OPTIONAL MATCH (doctors)<-[:BUNDLE]->(c:Bundle)
          WITH {doctor: doctors, packages:collect(c)} as newDoctorList
          RETURN newDoctorList`;

        tx.run(statement).subscribe({
          onNext(result) {
            const doctor = result.get('newDoctorList');
            const provider = parseDoctorData(doctor);
            const doc = {
              doctor: provider,
              packages: [],
            };

            doctor.packages.forEach((p) => {
              doc.packages.push(p.properties);
            });

            responseObject.doctors.push(doc);
          },
          onCompleted() {
            success = true;
          },
          onError(error) {
            reject(error);
          },
        });
      }

      if (success) {
        tx.commit().subscribe({
          onCompleted() {
            const finalResponseObject = {
              providers: _.shuffle(responseObject.doctors), // shuffle main list
            };
            // cache.set(cacheKey, { result: finalResponseObject }, 120); // set cache
            resolve(finalResponseObject);
            session.close();
          },
          onError(error) {
            tx.rollback();
            session.close();
            reject(error);
          },
        });
      } else {
        reject(new Error('error'));
        tx.rollback();
      }
    });
  },
  getAutoComplete() {
    return new Promise((resolve, reject) => {
      const session = neo4j.session();
      const tx = session.beginTransaction();
      const responseObject = {
        keywords: [],
      };

      const statement = `MATCH (n:Provider)
        WITH n.procedures_performed AS coll
        UNWIND coll AS x
        WITH DISTINCT x
        RETURN x AS setOfVals`;

      // RETURN REDUCE(output = [], r IN result | output + r) AS flat;

      tx.run(statement).subscribe({
        onNext(result) {
          const listOfKeywords = result.get('setOfVals');
          responseObject.keywords.push(listOfKeywords.trim());
        },
        onCompleted() {
          resolve(responseObject);
        },
        onError(error) {
          reject(error);
        },
      });

      tx.commit().subscribe({
        onCompleted() {
          // cache.set(cacheKey, { result: finalResponseObject }, 120); // set cache
          session.close();
        },
        onError(error) {
          tx.rollback();
          session.close();
          reject(error);
        },
      });
    });
  },
  getDoctorsSearchByKeyword(payload) {
    return new Promise((resolve, reject) => {
      if (!payload) {
        reject(new Error('Data was not provided'));
      }
      const {
        keyword,
        from,
        limit,
      } = payload;
      const session = neo4j.session();
      const skip = (from === undefined ? 0 : from);
      const lim = (limit === undefined ? 200 : limit);
      const tx = session.beginTransaction();
      const responseObject = {
        doctors: [],
        preferredProviders: [],
      };

      let success = true;
      const statement = `MATCH (doctors:Provider)
        WHERE "${keyword}" in doctors.procedures_performed
        WITH doctors ORDER BY doctors.priority SKIP ${skip} LIMIT ${lim}
        OPTIONAL MATCH (doctors)<-[:BUNDLE]->(c:Bundle)
        WITH {doctor: doctors, packages:collect(c)} as newDoctorList
        RETURN newDoctorList`;

      tx.run(statement).subscribe({
        onNext(result) {
          const doctor = result.get('newDoctorList');
          const provider = parseDoctorData(doctor);
          const doc = {
            doctor: provider,
            packages: [],
          };

          doctor.packages.forEach((p) => {
            doc.packages.push(p.properties);
          });

          responseObject.doctors.push(doc);
        },
        onCompleted() {
          success = true;
        },
        onError(error) {
          reject(error);
        },
      });

      // Preferred Providers TODO: Add regionalization and joint type
      const preferStatement = `MATCH (provider:Provider)<-[:BUNDLE]-(c:Bundle)
        WHERE provider.paid = 1
        WITH {doctor: provider, packages: collect(c)} as newProvider
        RETURN newProvider`;

      tx.run(preferStatement).subscribe({
        onNext(result) {
          const doctor = result.get('newProvider');
          const provider = doctor.doctor.properties;
          const imageAvatar = JSON.parse(provider.image_avatar);
          const imageMain = JSON.parse(provider.image_main);

          provider.image_avatar = imageAvatar;
          provider.image_main = imageMain;
          const doc = {
            doctor: provider,
            packages: [],
          };

          doctor.packages.forEach((p) => {
            doc.packages.push(p.properties);
          });

          responseObject.preferredProviders.push(doc);
        },
        onCompleted() {
          success = true;
        },
        onError(error) {
          reject(error);
        },
      });

      if (success) {
        tx.commit().subscribe({
          onCompleted() {
            const finalResponseObject = {
              providers: _.shuffle(responseObject.doctors), // shuffle main list
              preferredProviders: _.shuffle(responseObject.preferredProviders), // shuffle preferred list
            };
            // cache.set(cacheKey, { result: finalResponseObject }, 120); // set cache
            resolve(finalResponseObject);
            session.close();
          },
          onError(error) {
            tx.rollback();
            session.close();
            reject(error);
          },
        });
      } else {
        reject(new Error('error'));
        tx.rollback();
      }
    });
  },
};
