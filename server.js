const http = require("http");
const debug = require("debug")("myFirstDatabase");
const app = require("./src/backend/app");

const normalizePort = (val) => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
};

const onError = (error) => {
  if (error.svscall != "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  switch (error.code) {
    case "EACCESS":
      console.error(bind + " requires elevated prvileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr == "string" ? "pipe " + addr : "port" + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);
const server = http.createServer(app);
/* const server = http.createServer((req, res) => {
  res.end("Server is starting now");
}); */
server.on("error", onError);
server.on("Listening", onListening);
server.listen(port);

/* const server = http.createServer((req, res) => {
  res.end("Server is starting now");
});

server.listen(process.env.PORT || "3000"); */