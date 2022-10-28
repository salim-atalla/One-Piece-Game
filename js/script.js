const backFaceImg = "bg-card.png";
const imgs = [
  "zoro",
  "sanji",
  "nami",
  "usopp",
  "robin",
  "chopper",
  "brook",
  "franky",
];
const cards = [...shuffle(imgs), ...shuffle(imgs)];

let failsNum = 0;
const failsSpan = document.querySelector(".main-info .fails span");
failsSpan.textContent = failsNum;

// Shuffle Array
function shuffle(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

// Create Cards
createAllCards(cards);

setTimeout(flippeCardsFront, 1000);
setTimeout(flippeCardsBack, 2000);

// Create Single Card
function createCard(img) {
  const cardContainer = document.querySelector(".main-content");

  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.info = img;

  card.innerHTML = `
    <div class="face front">
      <img src="./imgs/${img}.png" alt="" />
    </div>
    <div class="face back">
      <img src="./imgs/${backFaceImg}" alt="" />
    </div>
  `;
  cardContainer.appendChild(card);
}

// Create All Cards
function createAllCards(imgs) {
  imgs.forEach((img) => createCard(img));
}

// Handle Flipping Card
function handleClickOnCards() {
  let flippedCards = [];

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (!card.classList.contains("flipped") && flippedCards.length < 2) {
        card.classList.add("flipped");
        flippedCards.push(card.dataset.info);
      }

      // If theres two flipped cards
      if (flippedCards.length === 2) {
        // Check if the cards are different
        if (flippedCards[0] !== flippedCards[1]) {
          failsNum++;
          setTimeout(() => {
            // reflippe the cards
            document
              .querySelectorAll(`.card[data-info="${flippedCards[0]}"]`)
              .forEach((card) => card.classList.remove("flipped"));
            document
              .querySelectorAll(`.card[data-info="${flippedCards[1]}"]`)
              .forEach((card) => card.classList.remove("flipped"));

            // Empty the array
            flippedCards.length = 0;
          }, 1000);
        } else {
          // Add the found person
          const namesList = document.querySelector(".main-info ul");
          let li = document.createElement("li");
          li.textContent = flippedCards[0];
          li.style.textTransform = "capitalize";
          namesList.appendChild(li);

          // Hide the sad luffy
          document.querySelector(".no-one").style.opacity = 0;
          flippedCards.length = 0;
        }
        failsSpan.textContent = failsNum;
      }
    });
  });
}
handleClickOnCards();

// Flippe All Cards to its back side
function flippeCardsBack() {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.classList.remove("flipped"));
}

// Flippe All Cards to its front side
function flippeCardsFront() {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.classList.add("flipped"));
}
