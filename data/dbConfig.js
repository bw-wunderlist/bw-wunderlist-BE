const knex = require("knex");
const knexConfig = require("../knexfile.js");

const dbEnv = process.env.development.DB_ENV || "development";

module.exports = knex(knexConfig[dbEnv]);
