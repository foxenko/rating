const http = require("http");
const {
  mainRouteController,
  gameRouteController,
  voteRouteController,
  defaultRouteController,
} = require("./controllers/");

const server = http.createServer((req, res) => {
  const url = req.url;
  switch (url) {
    case "/":
      mainRouteController(res, "/index.html", ".html");
      break;
    case "/game":
      gameRouteController(res);
      break;
    case "/vote":
      voteRouteController(req, res);
      break;
    default:
      defaultRouteController(res, url);
  }
});

const PORT = 3005;
server.listen(PORT);
