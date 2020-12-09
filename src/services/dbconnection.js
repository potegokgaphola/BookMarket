const mssql = require('mssql');

const config = {
  user: 'sa',
  password: 'Is7This7Enough7',
  server: 'localhost',
  database: 'BookMarket',
  options: {
    enableArithAbort: true,
    encrypt: true,
  }
};

const dbConnectionPool = new mssql.ConnectionPool(config).connect();

module.exports = { mssql, dbConnectionPool };
