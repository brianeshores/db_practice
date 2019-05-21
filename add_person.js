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
const argFName = process.argv[2];
const argLName = process.argv[3];
const argBDate = process.argv[4];


knex('famous_people').insert([{
  first_name: argFName, 
  last_name: argLName,
  birthdate: argBDate
}]).asCallback(function(err, rows){
  if(err) {
    console.log("insert error", err);
  }
  knex('famous_people').asCallback(function(err, rows){
    if(err) {
      console.log("select error", err);
    }
    console.log(rows);
  })
  .finally(function() {
    knex.destroy();
  })
});





