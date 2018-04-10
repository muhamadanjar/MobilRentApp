var app     =     require("express")();
var mysql   =     require("mysql");
var http    =     require('http').Server(app);
var io      =     require("socket.io")(http);
var bodyParser = require("body-parser");
/* Creating POOL MySQL connection.*/
var axios = require('axios');
var pool = require("./mysqlconfig");

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    var io = req.app.io;
    res.sendFile(__dirname + '/index.html');
    
});

/*  This is auto initiated event when Client connects to Your Machien.  */
/*app.io = io.on("connection", function(socket){
	console.log("Socket connected: " + socket.id);
});*/
io.on('connection',function(socket){  
    console.log("Socket connected: " + socket.id);
    /*setInterval(
        () => getCheckStatus(socket),
        10000
    );*/
    
    socket.on('status added',function(status){
        add_status(status);
        socket.emit('emit data','data di emit');
    });
    socket.on('refresh feed',function(data){
        var a = check_status(function (data) {
        });
        console.log(a);
    });

    
    

});

var add_status = function (status,callback) {
    pool.getConnection(function(err,connection){
        if (err) {
          callback(false);
          return;
        }
    connection.query("INSERT INTO `fbstatus` (`s_text`) VALUES ('"+status+"')",function(err,rows){
            connection.release();
            if(!err) {
              callback(true);
            }
        });
     connection.on('error', function(err) {
              callback(false);
              return;
        });
    });
}

var check_status = function (callback) {
    pool.getConnection(function(err,connection){
        if (err) {
            callback(false);
            return;
        }
        connection.query("SELECT * FROM sewa ",function(err,rows){
            connection.release();
            if(!err) {
                callback(rows);
                return rows;
            }
        });
        connection.on('error', function(err) {
            return;
        });
    });
}

const getApiAndEmit = socket => {
    try {
      const res = axios.get(
        "https://api.darksky.net/forecast/7d35698bfda8720f2083c8d5f385c1a7/43.7695,11.2558"
      );
      res.then(function (response) {
        console.log(response.data.currently.temperature);
        socket.emit("FromAPI", response.data.currently.temperature);
      })
      
    } catch (error) {
      console.error(`Error: ${error}`);
    }
};

const getCheckStatus = socket => {
    try {
      const res = axios.get(
        "http://localhost/api/mobil/1/checkstatus"
      );
      res.then(function (response) {
        console.log(response.data);
        socket.emit("checkstatus", response.data);
      })
      
    } catch (error) {
      console.error(`Error: ${error}`);
    }
};

http.listen(3000,function(){
    console.log("Listening on 3000");
});