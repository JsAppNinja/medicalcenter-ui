const uniqid = require('uniqid');
const neo4j = require('../config/neo4j');

function getProps(payload, fields = {}, addDefaults = false) {
  const props = {};
  const {
    scala: scalaFields,
    jsonArray: jsonArrayFields,
    jsonObject: jsonObjectFields,
    stringArray: stringArrayFields,
  } = fields;

  // scala fields
  scalaFields.forEach((field) => {
    if (payload[field] && ['number', 'string'].includes(typeof payload[field])) {
      props[field] = payload[field];
    } else if (addDefaults) {
      props[field] = '';
    }
  });

  // jsonArrayFields
  jsonArrayFields.forEach((field) => {
    const value = payload[field];
    if (value && Array.isArray(value)) {
      props[field] = [];

      value.forEach((item) => {
        props[field].push(JSON.stringify({
          ...item,
          uuid: uniqid(),
        }));
      });
    } else if (addDefaults) {
      props[field] = [];
    }
  });

  // json object
  jsonObjectFields.forEach((field) => {
    const value = payload[field];
    if (value) {
      props[field] = {
        ...value,
        uuid: value.uuid || uniqid(),
      };

      if (value.unit) {
        props[field].unit -= (process.env.APPLICATION_FEE || 50) * 1;
      }

      props[field] = JSON.stringify(props[field]);
    } else if (addDefaults) {
      props[field] = null;
    }
  });

  // string array fields
  stringArrayFields.forEach((field) => {
    if (payload[field] && Array.isArray(payload[field])) {
      props[field] = payload[field];
    } else if (addDefaults) {
      props[field] = [];
    }
  });

  return props;
}

function updateDoctor(uuid, payload) {
  const props = getProps(payload, {
    scala: [
      'name',
      'title',
      'phone',
      'city',
      'state',
      'country',
      'zipcode',
      'street',
      'experience',
      'photo_url',
      'website',
      'bio',
    ],
    jsonArray: [
      'education',
      'board_certifications',
      'memberships',
      'media_publications',
      'articles',
      'awards',
      'images',
      'videos',
      'qa_list',
      'travels',
    ],
    jsonObject: [],
    stringArray: [
      'hospital_affiliates',
      'admitting_hospitals',
      'languages',
      'specialities',
    ],
  });
  const statement = `
      MATCH (p:Provider)
      WHERE p.uuid="${uuid}" OR p.canonical_name="${uuid}"
      SET p += {props}
      RETURN p`;

  let promise = Promise.resolve();

  if (payload.bundles) {
    promise = upsertBundles(uuid, payload.bundles);
  }

  return promise.then(() => {
    const session = neo4j.session();
    return session
      .writeTransaction((transaction) => transaction.run(statement, { props }))
      .then((result) => {
        session.close();
        return result;
      })
      .catch((e) => {
        console.error(e); // eslint-disable-line no-console
        throw e;
      });
  });
}

function upsertBundles(doctorUUID, bundles) {
  const propsArray = bundles.map((bundle) => {
    const props = getProps(bundle, {
      scala: [
        'status_message',
        'financing_info',
        'image',
        'canonical_name',
        'description',
        'title',
        'consult_description',
        'status',
      ],
      jsonArray: [],
      jsonObject: [
        'discount',
        'consult_price',
        'tax',
        'total',
        'max_price',
        'min_price',
      ],
      stringArray: [
        'services',
        'joints',
        'labels',
      ],
    }, true);

    props.uuid = bundle.uuid || uniqid();
    return props;
  });

  const uuids = propsArray.map((p) => p.uuid);

  const statement = `
    MATCH (b1: Bundle)-[:BUNDLE]->(p1:Provider)
    WHERE NOT b1.uuid IN {uuids} AND (p1.uuid="${doctorUUID}" OR p1.canonical_name="${doctorUUID}")
    DETACH DELETE b1
    WITH count(*) as dummy
    UNWIND {props} as map
    MATCH (p:Provider)
    WHERE (p.uuid="${doctorUUID}" OR p.canonical_name="${doctorUUID}")
    MERGE (b:Bundle {uuid: map.uuid})-[:BUNDLE]->(p)
    ON CREATE SET b = map
    ON MATCH SET b += map
  `;

  const session = neo4j.session();
  return session
    .writeTransaction((transaction) => transaction.run(statement, { props: propsArray, uuids }))
    .then((result) => {
      session.close();
      return result;
    });
}

module.exports = {
  updateDoctor,
  upsertBundles,
};
