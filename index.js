// Place your server entry point code here

const coinRouter = require('./src/routes/coinRoutes');
const database = require('./src/middleware/dbMiddleware');
const args = require('minimist')(process.argv.slice(2))
var express = require("express")
var app = express()
const logdb = require("./database.js")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
args["port"]
args["debug"]=false
args["log"]=true
var port = args.port | 5555
app.use(express.static('./public'));
app.use(database.db);

app.get('/app/echo/:number',(req,res)=>{
    res.status(200)/json({'message':req.params.number})
})


app.get('/app',(req,res)=> {
   res.statusCode=200;
   res.statusMessage='OK';
   res.writeHead(res.statusCode,{'Content-Type':'text/plain'});
   res.end(res.statusCode+' '+res.statusMessage)

})
app.get('/app/flip',(req,res)=>{
    var flips = coinFlip()
    
    res.status(200).json({ 'flip':flip})
})
app.get('/app/flips/:number',(req,res)=>{
    const flips = (req.params.number)
    const coins=coinFlips(flips)
    res.status(200).json({ 'raw':coins,'summary':countFlips(coins)})
})

app.get('/app/flip/call/:call',(req,res)=>{
const calling =(req.params.call)
const coin = coinFlip()
var result ="win"
if(coin!=calling){
    result="lose"
}
res.status(200).json({"call":calling,"flip":coin,"result":result})


})
app.use(function(req,res){
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})

const help = (`
server.js [options]
--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.
--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.
--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.
--help	Return this message and exit.
`)
if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

const server = app.listen(port, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",port))
});
app.get("/app/", (req, res,next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
    
});

app.use( (req, res, next) => {
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
         method: req.method,
         url: req.url,
         protocol: req.protocol,
        httpversion: req.httpVersion,
         status: res.statusCode,
         referer: req.headers['referer'],
         useragent: req.headers['user-agent']
     }
     const stmt = logdb.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
     const info = stmt.run(logdata.remoteaddr, logdata.remoteuser,  logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
    res.status(200).json(info)
     next()
 });

if(args.debug===true){
    app.use('/app', debug_router);
    app.get("/app/log/access",(req,res,next) =>{
     
         const stmt = logdb.prepare('SELECT * FROM accesslog').all()
         res.status(200).json(stmt)}
    )
    app.get("/app/error",(req,res,next) =>{
     throw new Error('Error test successful.')

   
    })
    
const morgan = require("morgan");
const fs = require("fs");

if(args.log===true){
const accessLog = fs.createWriteStream("./data/log/access.log", { flags: "a" });
app.use(morgan("combined", { stream: accessLog }));}

app.use('/app', coinRouter); 
 }
