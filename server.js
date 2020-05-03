const server = require ('express')();
const http = require ('http').Server (server);

const cors = require ('cors');
const bodyParser = require ("body-parser");
const urlencodedParser = bodyParser.urlencoded ({limit: '50mb', extended: true});
const jsonParser = bodyParser.json ({limit: '100mb', extended: true});

server.use (cors ());

server.use (urlencodedParser);

server.use (jsonParser);

// server.get ('/', (req, res) => {
//     res.sendFile (__dirname + '/frontend/view/index.html');
// });
// server.get ('/index.js', (req, res) => {
//     res.sendFile (__dirname + '/frontend/javascript/public/production.js');
// });
// server.get ('/favicon.ico', (req, res) => {
//     res.sendFile (__dirname + '/favicon.ico');
// });

// server.get ('/style.css', (req, res) => {
//     res.sendFile (__dirname + '/frontend/style/widget.css');
// });
// http.listen (2000, () => {
//     console.log ("127.0.0.1: 2000");
// });
