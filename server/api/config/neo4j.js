const neo4j = require('neo4j-driver').v1;
const config = require('../../config');

const driver = neo4j.driver(config.neo4jURL, neo4j.auth.basic(config.neo4jUser, config.neo4jPass));

module.exports = driver;
