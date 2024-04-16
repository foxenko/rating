const fs = require("fs");

async function makeRatingFile(path, array) {
  const ratingFile = await fs.readFileSync(path, "utf-8");
  const ratingArray = JSON.parse(ratingFile);
  const arr = Array.from(array);
  let hasNewGames = false;

  arr.forEach((item) => {
    if (!ratingArray.find((el) => el.id === item.id)) {
      hasNewGames = true;
      let obj = {
        id: item.id,
        title: item.title,
        image: item.image,
        description: item.description,
        rating: 0,
      };
      ratingArray.push(obj);
    }
  });
  if (hasNewGames) {
    await fs.writeFile(path, JSON.stringify(ratingArray));
    console.log("Файл записан!");
  }
}

module.exports = makeRatingFile;
