const { defineConfig } = require("cypress");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'njoxlhks',
  host: 'batyr.db.elephantsql.com',
  database: 'njoxlhks',
  password: '41IHYRc-3F2lZM1quYq710lksbx9W_H4',
  port: '5432'
});

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        removeUser(email) {
          return new Promise(function(resolve){
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
  },
  DB: {
    user: 'njoxlhks',
    host: 'batyr.db.elephantsql.com',
    database: 'njoxlhks',
    password: '41IHYRc-3F2lZM1quYq710lksbx9W_H4',
    port: '5432'
  },
});
