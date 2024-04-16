const fs = require("fs");
const { parseBody } = require("../appModules/http-utils/");
const {
  PATH_TO_RATING_FILE,
  WEIGHT,
  createRating,
  updateRating,
} = require("../appModules/rating");

async function voteRouteController(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 404;
    res.end("Not Found");
  } else {
    res.statusCode = 200;
    const body = await parseBody(req);
    const data = JSON.parse(body);
    const rating = createRating(data, WEIGHT);

    const ratingFile = await fs.readFileSync(PATH_TO_RATING_FILE);
    const ratingArray = JSON.parse(ratingFile);
    const newRating = updateRating(ratingArray, data.id, rating);

    await fs.writeFileSync(PATH_TO_RATING_FILE, JSON.stringify(newRating));
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(newRating));
  }
}

module.exports = voteRouteController;
