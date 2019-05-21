const pg = require("pg");
const settings = require("./settings");
const arg = process.argv[2];
let count = 0;

const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  });

  client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE famous_people.first_name = $1", [arg], (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
        for (i = 0; i < result.rows.length; i++) {
            count += 1;
            console.log(`- ${count} ${result.rows[i].first_name} ${result.rows[i].last_name} born '${result.rows[i].birthdate}'`)
        }
        client.end();
    })
});