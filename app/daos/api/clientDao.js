const connection = require('../../config/dbconfig');

const clientDao = {
  table: 'client',
  patientVisits: async (res, table) => {
    let [patients, patientResultsfields] = await connection.execute(
      `SELECT * FROM ${table}`
    );

    let [Sqlvisits, visitfields] = await connection.execute(
      `Select
      v.*,
      p.first_name 'Practitioner First Name',
      p.last_name 'Practitioner Last Name',
      p.years_practicing,
      pt.practitioner_type,
      sa.service_id,
      s.service_name,
      s.cost
    FROM
      visit v
      join practitioner p ON v.practitioner_id = p.practitioner_id
      JOIN practitioner_type pt ON pt.practitioner_type_id = p.practitioner_type_id
      JOIN service_administered sa ON sa.visit_id = v.visit_id
      JOIN service s ON s.service_id = sa.service_id
		`
    );
    let patientsWithVisits = patients.map(function (patient) {
      patient.visits = [];
      patient.visits = Sqlvisits.filter(
        (visit) => visit.client_id === patient.client_id
      );
      return patient;
    });
    if (patientsWithVisits) {
      if (patientsWithVisits.length == 1) {
        res.json(...patientsWithVisits);
      } else {
        res.json(patientsWithVisits);
      }
    } else {
      console.log('DAO Error', error);
    }
  },
  singlePatientVisit: async (res, table, id) => {
    let [
      patients,
      fields,
    ] = await connection.execute(
      `SELECT * FROM ${table} WHERE ${table}_id = ?`,
      [id]
    );

    let [Sqlvisits, visitfields] = await connection.execute(
      `Select
      v.*,
      p.first_name 'Practitioner First Name',
      p.last_name 'Practitioner Last Name',
      p.years_practicing,
      pt.practitioner_type,
      sa.service_id,
      s.service_name,
      s.cost
    FROM
      visit v
      join practitioner p ON v.practitioner_id = p.practitioner_id
      JOIN practitioner_type pt ON pt.practitioner_type_id = p.practitioner_type_id
      JOIN service_administered sa ON sa.visit_id = v.visit_id
      JOIN service s ON s.service_id = sa.service_id
		`
    );
    let patientsWithVisits = patients.map(function (patient) {
      patient.visits = [];
      patient.visits = Sqlvisits.filter(
        (visit) => visit.client_id === patient.client_id
      );
      return patient;
    });
    if (patientsWithVisits) {
      if (patientsWithVisits.length == 1) {
        res.json(...patientsWithVisits);
      } else {
        res.json(patientsWithVisits);
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
module.exports = clientDao;
