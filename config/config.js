require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "data_base",
    host: "127.0.0.1",
    dialect: "mysql",
    use_env_variable: "DB_URL",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    use_env_variable: "CLEARDB_DATABASE_URL",
  },
};
