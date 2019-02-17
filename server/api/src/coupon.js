const neo4j = require('../config/neo4j');

function verifyCoupon(doctorID, couponID) {
  const session = neo4j.session();

  const statement = `
    MATCH (p:Provider)<-[:COUPON]-(c:Coupon)
    WHERE (p.canonical_name="${doctorID}" OR p.uuid="${doctorID}") AND (c.name="${couponID}")
    WITH {
      type: c.type,
      name: c.name,
      uuid: c.uuid,
      value: c.value
    } AS result
    RETURN result`;

  return session
    .readTransaction((transaction) => transaction.run(statement))
    .then((result) => {
      session.close();
      return result.records.map((r) => r.get('result'));
    })
    .then((result) => ({
      coupon: result[0],
    }));
}

module.exports = {
  verifyCoupon,
};
