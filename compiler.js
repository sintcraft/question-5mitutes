const fs = require("fs");

const config = {
  name: "tuli.txt",
  questions: 100,
};

let questions = [];

fs.readFileSync("./questions.txt", { encoding: "utf-8" })
  .split("\n")
  .map((line) => {
    if (
      questions.map((x) => x.toLowerCase()).indexOf(line.toLowerCase()) === -1
    )
      questions.push(line);
  });

questions = shuffle(questions);

questions = questions.slice(0, config.questions);

fs.writeFileSync("./presets/" + config.name, questions.join("\n"), {
  encoding: "utf-8",
});

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
