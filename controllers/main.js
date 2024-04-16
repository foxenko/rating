const { staticFile } = require("../appModules/http-utils/");
const { getData, endpoints } = require("../appModules/api");
const { makeRatingFile, PATH_TO_RATING_FILE } = require("../appModules/rating");

async function mainRouteController(res, publicUrl, extname) {
  const data = await getData(endpoints.games);
  console.log(data);
  await makeRatingFile(PATH_TO_RATING_FILE, data); //TODO
  res.statusCode = 200;
  staticFile(res, publicUrl, extname);
}

module.exports = mainRouteController;
