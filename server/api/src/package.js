const neo4j = require('../config/neo4j');
const _ = require('underscore');

function getRandomInt(keyword) {
  let max;

  switch (keyword) {
    case 'shoulder':
      max = 10; // 20
      break;
    case 'knee':
      max = 10; // 30
      break;
    default:
      max = 10;
  }

  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
  getPackage(payload) {
    return new Promise((resolve, reject) => {
      if (!payload) {
        reject(new Error('Data was not provided'));
      }
      const { name } = payload;
      const session = neo4j.session();
      const tx = session.beginTransaction();
      const responseObject = {
        doctors: [],
      };
      const lim = 100;
      const skip = getRandomInt(name);

      const statement = `MATCH (doctors:Provider)<-[cp:BUNDLE]->(package:Bundle)
      WHERE package.canonical_name = "${name}"
      WITH doctors ORDER BY toInteger(doctors.priority) SKIP ${skip} LIMIT ${lim}
      WITH {doctor: doctors} as newDoctorList
      RETURN newDoctorList`;

      tx.run(statement).subscribe({
        onNext(result) {
          const doctor = result.get('newDoctorList');
          const provider = doctor.doctor.properties;
          const imageAvatar = JSON.parse(provider.image_avatar);
          const imageMain = JSON.parse(provider.image_main);
          provider.image_avatar = imageAvatar;
          provider.image_main = imageMain;
          responseObject.doctors.push(provider);
        },
        onCompleted() {
          const finalResponseObject = {
            providers: _.shuffle(responseObject.doctors), // shuffle main list
          };
          resolve(finalResponseObject);
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
  getPackagesSearch(payload) {
    return new Promise((resolve, reject) => {
      if (!payload) {
        reject(new Error('Data was not provided'));
      }

      const {
        cat,
        keyword,
        limit,
        from,
      } = payload;

      const session = neo4j.session();
      const tx = session.beginTransaction();
      const responseObject = {
        packages: [],
      };

      let success = true;
      const skip = (from === undefined ? 0 : from);
      const lim = (limit === undefined ? 200 : limit);

      let query = [
        cat ? `"${cat}" in packages.joints` : '',
        keyword ? `"${keyword}" in packages.labels` : '',
      ].filter((s) => s)
        .join(' AND ');

      query = query ? `WHERE ${query}` : '';

      const statement = `
        MATCH (doctor:Provider)<-[cp:BUNDLE]-(packages:Bundle)
      ${query}
      WITH packages
      ORDER BY packages.title SKIP ${skip} LIMIT ${lim}
      WITH collect(distinct packages.title) as newList
      UNWIND newList AS title
      WITH title
      MATCH (doctors:Provider)<-[cp:BUNDLE]-(package:Bundle)
      WHERE package.title = title
      WITH {
        title: package.title,
        canonicalName: package.canonical_name,
        image: package.image,
        description: package.description,
        consultDescription: package.consult_description,
        maxPrice: collect(package.max_price)[0],
        minPrice: collect(package.min_price)[0],
        consultPrice: collect(package.consult_price)[0],
        providers: count(doctors)
      } as newList
      RETURN newList`;

      tx.run(statement).subscribe({
        onNext(result) {
          const responseData = result.get('newList');
          const {
            uuid,
            title,
            canonicalName,
            image,
            description,
            consultDescription,
            maxPrice,
            minPrice,
            consultPrice,
            providers,
          } = responseData;

          const pack = {
            uuid,
            title,
            canonicalName,
            image,
            description,
            consultDescription,
            maxPrice: JSON.parse(maxPrice),
            minPrice: JSON.parse(minPrice),
            consultPrice: JSON.parse(consultPrice),
            providers: providers.toString(),
          };

          pack.maxPrice.unit += (process.env.APPLICATION_FEE || 50) * 1;
          pack.minPrice.unit += (process.env.APPLICATION_FEE || 50) * 1;
          pack.consultPrice.unit += (process.env.APPLICATION_FEE || 50) * 1;

          responseObject.packages.push(pack);
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
            session.close();
            resolve(responseObject);
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
