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
        },
        findToken(email) {
          return new Promise(function(resolve){
            const pool = new Pool({
              user: process.env.DB_USER,
              host: process.env.DB_HOST,
              database: process.env.DB_DATABASE,
              password: process.env.DB_PASSWORD,
              port: process.env.DB_PORT
            });

            pool.query('select B.token from ' +
              'public.users A ' +
              'INNER JOIN public.user_tokens B ' + // Corrigido para 'public.user_tokens'
              'ON A.id = B.user_id ' +
              'WHERE A.email = $1 ' +
              'ORDER BY B.created_at', [email], function(error, result){ // Corrigido para 'result.rows[0].token'
              if (error) {
                throw error;
              }
              resolve({ token: result.rows[0].token }); // Corrigido para 'result.rows[0].token'
            });
          });
        }
      });
    }
  }
});
