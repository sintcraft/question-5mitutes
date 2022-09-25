const startPanel = document.getElementById("start-panel");
const questionPanel = document.getElementById("question-panel");
var index = 0;
var time = 60 * 5; //seconds

setInterval(() => {
  if (time < 0) return;
  let minutes =
    (time / 60 < 10 ? "0" : "") + (time / 60 < 1 ? "0" : Math.floor(time / 60));
  let seconds = time % 60;
  seconds = (seconds < 10 ? "0" : "") + seconds;
  document.getElementById("time").innerText = `${minutes}:${seconds}`;
  time--;
}, 1000);

const start = () => {
  time = 5 * 60;
  document.getElementById("audio-start").play();
  startPanel.style.transform = "translateY(100%)";
  startPanel.animate(
    [
      {
        transform: "translateY(0)",
      },
      {
        transform: "translateY(100%)",
      },
    ],
    {
      duration: 300,
    }
  );
  setTimeout(() => {
    startPanel.style.display = "none";
    questionPanel.style.display = "block";
    display();
  }, 400);
};

const display = () => {
  const title = document.getElementById("question-title");
  const content = document.getElementById("question-content");

  title.innerHTML = `Question #${index + 1}`;
  content.innerHTML = questions[index];
};

const next = () => {
  document.getElementById("audio-next").volume = 0.3;
  document.getElementById("audio-next").play();
  if (index >= questions.length - 1) return restart();
  index++;
  display();
};

const prev = () => {
  document.getElementById("audio-prev").volume = 0.3;
  document.getElementById("audio-prev").play();
  if (index <= 0) return restart();
  index--;
  display();
};

const restart = () => {
  index = 0;
  questionPanel.animate(
    [
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    ],
    350
  );
  setTimeout(() => {
    questionPanel.style.display = "none";
    startPanel.style.display = "block";
    startPanel.style.transform = "translateY(0)";
    startPanel.animate(
      [
        {
          transform: "translateY(100%)",
        },
        {
          transform: "translateY(0)",
        },
      ],
      {
        duration: 300,
      }
    );
  }, 300);
};

var questions = [];
const request = async () => {
  let data = await fetch("./presets/all.txt").then((x) => x.text());
  questions = filter(data.split("\n"));
  for (let elem of document.getElementsByClassName("questions-count")) {
    elem.innerHTML = questions.length + " Questions";
  }
};

request();

const filter = (texts) => {
  const resp = [];
  for (const line of texts) {
    if (resp.indexOf(line) === -1) resp.push(line);
  }
  return resp;
};
