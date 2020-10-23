const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: "",
  aiHand: "",
};

const hands = document.querySelectorAll(".select img");
const h3s = document.querySelectorAll("h3");

//choosing hand
function handSelection() {
  game.playerHand = this.dataset.option;
  hands.forEach((hand) => {
    hand.style.boxShadow = "";
    hand.classList.remove("hover-noactive");
    hand.classList.add("hover-active");
  });
  this.style.boxShadow = "0 0 0 4px #fad185";
  this.classList.add("hover-noactive");
  this.classList.remove("hover-active");
}

function aiChoice() {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function checkResult(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "paper" && ai === "stone") ||
    (player === "stone" && ai === "scissors") ||
    (player === "scissors" && ai === "paper")
  ) {
    return "win";
  } else {
    return "loss";
  }
}

//publishing the result
function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;

  if (result === "win") {
    document.querySelector("p.wins span").textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = "You won!";
    document.querySelector('[data-summary="who-win"]').style.color = "#3eb960";
  } else if (result === "loss") {
    document.querySelector("p.losses span").textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "You lost!";
    document.querySelector('[data-summary="who-win"]').style.color = "#ee5051";
  } else {
    document.querySelector("p.draws span").textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "Draw!";
    document.querySelector('[data-summary="who-win"]').style.color = "#20bef2";
  }
}

function endGame() {
  const currentHand = document.querySelector(
    "[data-option='" + game.playerHand + "']"
  );
  currentHand.style.boxShadow = "";
  currentHand.classList.add("hover-active");
  currentHand.classList.remove("hover-noactive");
  game.playerHand = "";
  game.aiHand = "";
}

//main function
function startGame() {
  if (!game.playerHand) {
    return alert("Select hand!");
  }
  game.aiHand = aiChoice();

  h3s.forEach((h3) => (h3.style.color = "#ffc078"));

  const gameResult = checkResult(game.playerHand, game.aiHand);
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}

hands.forEach((hand) => hand.addEventListener("click", handSelection));
document.querySelector(".start").addEventListener("click", startGame);

//navigation burger
const burger = document.querySelector(".burger");
const iconBurger = document.querySelector(".fa-bars");
const iconX = document.querySelector(".fa-times");
const column = document.querySelector("aside");

burger.addEventListener("click", function () {
  iconBurger.classList.toggle("show");
  iconX.classList.toggle("show");
  column.classList.toggle("show");
});

//start again
const h2Aside = document.querySelector("aside h2");
h2Aside.addEventListener("click", () => {
  h3s.forEach((h3) => (h3.style.color = "#eee"));

  gameSummary.numbers = 0;
  gameSummary.wins = 0;
  gameSummary.losses = 0;
  gameSummary.draws = 0;

  document.querySelector('[data-summary="your-choice"]').textContent = "";
  document.querySelector('[data-summary="ai-choice"]').textContent = "";
  document.querySelector('[data-summary="who-win"]').textContent = "";
  document.querySelector("p.numbers span").textContent = 0;
  document.querySelector("p.wins span").textContent = 0;
  document.querySelector("p.losses span").textContent = 0;
  document.querySelector("p.draws span").textContent = 0;
});
