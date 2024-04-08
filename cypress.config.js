const { defineConfig } = require("cypress");
const mysql = require("mysql");


function executeQuery(query, config) {
  const connection = mysql.createConnection(config.env.db);
  
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          connection.end();
          resolve(results);
        }
      });
    });
  });
}

module.exports = defineConfig({
  env: {
    db: {
      host: "sql6.freesqldatabase.com",
      user: "sql6697551",
      password: "xXv5St6ijH",
      database: "sql6697551"
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Регистрируем задачу queryDb
      on("task", {
        queryDb: (query) => {
          return executeQuery(query, config);
        }
      });
    }
  }
});

