var express = require("express");
var http = require("http");
var socketIo = require("socket.io");
var axios = require("axios");
var port = process.env.PORT || 9999;
const index = require("./routes/index");
var app = express();
app.use(index);
var server = http.Server(app);
var io = socketIo(server);
io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = socket => {
  try {
    const res = axios.get(
      "http://localhost:8000/api/bookings/1/checkstatus"
    );
    console.log(res)
    socket.emit("FromAPI", res.data.currently.temperature);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log('Listening on port: '+ port));

