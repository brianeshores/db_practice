const pg = require("pg");
const settings = require("./settings");
const knex = require("knex")({
    client: 'pg',
    connection: {
        user     : settings.user,
        password : settings.password,
        database : settings.database,
        host     : settings.hostname,
        port     : settings.port,
        ssl      : settings.ssl
    }
  });
const arg = process.argv[2];
let count = 0; 
// const getResults = async (callback) => {
//     console.log(await knex.select("*").from("famous_people"));


knex.select().from("famous_people")
.asCallback(function(err, rows){
    
    for(i = 0; i < rows.length; i++) {
        if (arg === rows[i].first_name) {
            count += 1;
            console.log(`- ${count} ${rows[i].first_name} ${rows[i].last_name} born '${rows[i].birthdate}'`)
            };
        }
    })
.finally(function() {
    knex.destroy();
  })

