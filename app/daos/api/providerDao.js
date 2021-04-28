const connection = require('../../config/dbconfig');

const providerDao = {
  table: 'practitioner',
  allPractitioners: async (res, table) => {
    let [results, fields] = await connection.execute(`
	SELECT * FROM ${table} p
	JOIN practitioner_type pt
	ON pt.practitioner_type_id = p.practitioner_type_id
	`);

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
  findPracById: async (res, table, id) => {
    let [results, fields] = await connection.execute(
      `SELECT * FROM ${table} p 
			JOIN practitioner_type pt ON pt.practitioner_type_id = p.practitioner_type_id
		WHERE ${table}_id = ? 
	  `,
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
  create: async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.json({
        error: true,
        message: 'No fields to create.',
      });
    } else {
      const fields = Object.keys(req.body);
      const values = Object.values(req.body);

      try {
        let result = await connection.execute(
          `INSERT INTO client SET ${fields.join(' = ?, ')} = ?`,
          values
        );
        console.log(result);
        console.log({ dbdata });
        res.send(`Last id: ${result.insertId}`);
      } catch (error) {
        console.log('DAO Error', error);
        res.send('Error creating record.', error);
      }
    }
  },
};
module.exports = providerDao;
