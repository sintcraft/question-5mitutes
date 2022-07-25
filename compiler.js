var questions = [];
const request = async () => {
  const data = await fetch("./questions.txt").then((x) => x.text());
  questions = data.split("\n");
  for (let elem of document.getElementsByClassName("questions-count")) {
    elem.innerHTML = questions.length + " Questions";
  }
};

request();
