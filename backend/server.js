const http = require("http");
const app = require("./app");
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

app.set("port", port);

mongoose.connect('mongodb://localhost:27017/puzzle', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('WEBFR Datenbank erfolgreich verbunden! :)');
        const server = http.createServer(app);
        console.log("Listening on port:", port);
        server.listen(port);
    })
    .catch(err => console.log(err));
