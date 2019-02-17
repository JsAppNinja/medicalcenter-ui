const neo4j = require('../config/neo4j');

module.exports = {
  getQuickSearch(query) {
    const session = neo4j.session();
    const q = query.replace(/[^A-Za-z\s0-9,]/g, '').toLowerCase();

    const statement = `
      MATCH (provider:Provider)
      WHERE toLower(provider.name) =~ ".* ${q}.*"
      WITH provider
      ORDER BY provider.name ASC, toInteger(provider.paid) DESC LIMIT 5
      WITH {
        type: "provider",
        title: provider.name,
        uuid: CASE provider.paid
          WHEN 1 THEN provider.canonical_name
          ELSE provider.uuid
          END,
        image: provider.photo_url
      } as result
      RETURN result
      UNION
      MATCH (package:Bundle)
      WHERE toLower(package.title) =~ ".*${q}.*"
      WITH package
      LIMIT 5
      WITH {
        type: "bundle",
        title: package.title,
        uuid: package.uuid,
        image: package.image
      } as result
      RETURN result
    `;

    return session
      .readTransaction((transaction) => transaction.run(statement))
      .then((result) => {
        session.close();
        return result.records.map((r) => r.get('result'));
      });
  },
};
