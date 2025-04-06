const quizFilter = [
  {
    id: 0,
    label: "Biologia",
  },
  { id: 1, label: "TI" },
];

const url = new URL(window.location.href);
const t = url.searchParams.get("t");

if (t) {
  document.querySelector(".quiz-filter").innerHTML = quizFilter.find(
    (qf) => qf.id == t
  ).label;
} else {
  document.querySelector(".quiz-filter").innerHTML = "";
}

// Init
let qIndex = 0;

correct = 0;
q = 1;

init();

async function init() {
  const exam = questions[qIndex].exam
    ? `<b>[${questions[qIndex].exam}] </b>`
    : "";
  document.querySelector(".question").innerHTML =
    exam + questions[qIndex].label;

  document.querySelector(".points").innerHTML = `Q. #${qIndex + 1} / ${
    questions.length
  } (${correct} correctas)`;

  let buttons = "";

  questions[qIndex].answers.forEach(
    (a) => (buttons += `<button id='btn-${a}' value='${a}'>${a}</butto>`)
  );

  document.querySelector(".answers").innerHTML = buttons;

  document.querySelectorAll(".answers button").forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.value === questions[qIndex].answer) {
        correct++;
        document.getElementById(`btn-${e.target.value}`).style.backgroundColor =
          "#2bccb1";

        qIndex = (qIndex + 1) % questions.length;
        if (qIndex === 0) {
          correct = 0;
          alert("Wau!");
        }
      } else {
        document.getElementById(`btn-${e.target.value}`).style.backgroundColor =
          "red";
        document.getElementById(
          `btn-${questions[qIndex].answer}`
        ).style.backgroundColor = "#2bccb1";
        document.getElementById(`btn-${questions[qIndex].answer}`).style.color =
          "#fff";

        correct = 0;
        qIndex = 0;
      }

      document.getElementById(`btn-${e.target.value}`).style.color = "#fff";

      setTimeout(() => {
        init();
        document.querySelector(".points").innerHTML = `Q. #${qIndex + 1} / ${
          questions.length
        } (${correct} correctas)`;
      }, 3000);
    });
  });
}
