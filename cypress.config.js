require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const { defineConfig } = require("cypress");
const { Pool } = require('pg');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        removeUser(email) {
          return new Promise(function(resolve){
            const pool = new Pool({
              user: process.env.DB_USER,
              host: process.env.DB_HOST,
              database: process.env.DB_DATABASE,
              password: process.env.DB_PASSWORD,
              port: process.env.DB_PORT
            });

            pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result){
              if (error) {
                throw error;
              }
              resolve({ success: result });
            });
          });
        }
      });
    }
  }
});
