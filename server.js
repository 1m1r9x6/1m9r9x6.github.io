const server = require ('express') ();
const http = require ('http').Server (server);
const io = require ('socket.io').listen (8080); 
const cors = require ('cors');
const bodyParser = require ("body-parser");
const urlencodedParser = bodyParser.urlencoded ({limit: '50mb', extended: true});
const jsonParser = bodyParser.json ({limit: '100mb', extended: true});

const dbDiagnosis = require ('./db.js').dbDiagnosis
const dbTests = require ('./db.js').dbTests
const dbArticles = require ('./db.js').dbArticles
const dbArticlesNames = require ('./db.js').dbArticlesNames
server.use (cors ());
server.use (urlencodedParser);
server.use (jsonParser);


io.sockets.on ('connection', function (socket) {
    console.log ('user connection');
    socket.on ('get tests', ()=>{
        const data=JSON.stringify ({"list":dbTests});
        socket.emit ('tests',data);
    });
    socket.on ('get tests name', ()=>{
        let data=[]
        for ( i in dbTests)
        data.push (i);
        data=JSON.stringify ({"list":data});
        socket.emit ('tests name',data);
    });
    socket.on ('get card', (name)=>{
        const data=JSON.stringify ({"list":dbDiagnosis[name]});
        socket.emit ('card',data);
    });
    socket.on ('get diagnozes', ()=>{
        let data=[]
        for ( i in dbDiagnosis)
        data.push (i);
        data=JSON.stringify ({"list":data});
        socket.emit ('diagnozes',data);
    });
    socket.on ('get articles search', (search)=>{
        if(search.length>6)
        search=search.slice(0,search.length-3);
        let data={};
        let flag=true;
        for(let i in dbArticles)
            for(let j in dbArticles[i])
                if(j.toLowerCase().indexOf(search.toLowerCase())!=-1){    
                    data[j]=dbArticles[i][j];
                    flag=false;
                }
        if(flag)
        data["К сожалению ничего не найдено"]="#"
        data=JSON.stringify ({"list":data});
        socket.emit ('articles search',data);
    });
    socket.on ('get articles by name', (name)=>{
        // console.log(name);
        const list=dbArticles[name];
        for(i in dbArticlesNames)
            if(dbArticlesNames[i]==name)
                name=i;
        // console.log(name);
        const data=JSON.stringify ({"list":list,"name":name});
        socket.emit ('articles by name',data);
    });
    socket.on ('get articles names', ()=>{
        const data=JSON.stringify ({"list":dbArticlesNames});
        socket.emit ('articles names',data);
    });
    
    socket.on ('disconnect', function () {
        console.log ('user disconnected');
    });
});

server.get ('/', (req, res) => {
    res.sendFile (__dirname + '/index.html');
});

server.get ('/index.js', (req, res) => {
    res.sendFile (__dirname + '/index.js');
});

server.get ('/1.html', (req, res) => {
    res.sendFile (__dirname + '/1.html');
});

server.get ('/favicon.ico', (req, res) => {
    res.sendFile (__dirname + '/favicon.ico');
});

server.get ('/style.css', (req, res) => {
    res.sendFile (__dirname + '/index.css');
});

http.listen (2000, () => {
    console.log ("192.168.0.102: 2000");
});
