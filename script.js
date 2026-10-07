const actors = [
  {
    id: 'offgun',
    name: 'Off & Gun 💚',
    pictureText: 'Off & Gun'
  },
  {
    id: 'taynew',
    name: 'Tay & New 💙',
    pictureText: 'Tay & New'
  },
  {
    id: 'brightwin',
    name: 'Bright & Win 🤍',
    pictureText: 'Bright & Win'
  },
  {
    id: 'mileapo',
    name: 'Mile & Apo 🖤',
    pictureText: 'Mile & Apo'
  },
  {
    id: 'zeenunew',
    name: 'Zee & NuNew 💖',
    pictureText: 'Zee & NuNew'
  },
  {
    id: 'geminifourth',
    name: 'Gemini & Fourth 💛',
    pictureText: 'Gemini & Fourth'
  },
  {
    id: 'firstkhaotung',
    name: 'First & Khaotung 🧡',
    pictureText: 'First & Khaotung'
  },
  {
    id: 'pondphuwin',
    name: 'Pond & Phuwin 💜',
    pictureText: 'Pond & Phuwin'
  }
];

const gameBoard = document.getElementById('gameBoard');
const movesCounter = document.getElementById('moves');
const matchesCounter = document.getElementById('matches');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matches = 0;

function initGame() {
  let cardsData = [];
  actors.forEach(actor => {
    cardsData.push({ id: actor.id, content: actor.name });
    cardsData.push({ id: actor.id, content: actor.pictureText });
  });

  cardsData.sort(() => Math.random() - 0.5);

  gameBoard.innerHTML = '';
  moves = 0;
  matches = 0;
  movesCounter.textContent = moves;
  matchesCounter.textContent = matches;
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];

  cardsData.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="front-face"><span>${item.content}</span></div>
      <div class="back-face">💌</div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  incrementMoves();
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.id === secondCard.dataset.id;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matches++;
  matchesCounter.textContent = matches;

  resetBoard();

  if (matches === actors.length) {
    setTimeout(() => alert(`🎉 Amazing! You matched all pairs in ${moves} moves!`), 400);
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function incrementMoves() {
  moves++;
  movesCounter.textContent = moves;
}

function resetGame() {
  initGame();
}

initGame();