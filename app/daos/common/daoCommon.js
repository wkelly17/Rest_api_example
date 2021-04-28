const connection = require('../../config/dbconfig');

const daoCommon = {
  findAll: async (res, table) => {
    let [results, fields] = await connection.execute(`SELECT * FROM ${table}`);
    if (results) {
      if (results.length == 1) {
        res.json(...results);
      } else {
        res.json(results);
      }
    } else {
      console.log('DAO Error', error);
    }
  },
  findById: async (res, table, id) => {
    let [
      results,
      fields,
    ] = await connection.execute(
      `SELECT * FROM ${table} WHERE ${table}_id = ?`,
      [id]
    );

    if (results) {
      if (results.length == 1) {
        res.json(...results);
      } else {
        res.json(results);
      }
    } else {
      console.log('DAO Error', error);
    }
  },
  //  countAll: (res, table) => {
  //      connection.execute(
  //          `SELECT COUNT(*) count FROM ${table}`,
  //          (error, rows) => {
  //              if (!error) {
  //                  if (rows.length == 1) {
  //                      res.json(...rows);
  //                  } else {
  //                      res.json(rows);
  //                  }
  //              } else {
  //                  console.log('DAO Error', error);
  //              }
  //          });
  //  }
};

module.exports = daoCommon;
