let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  techs: [
    "bootstrap",
    "electron",
    "firebase",
    "html",
    "css",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react",
  ],
  cards: null,

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];
    console.log(card);
    if (card.flipped || this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function () {
    if(!this.firstCard || !this.secondCard){
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function(){
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unFlipCard(){
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver(){
    return this.cards.filter(card => !card.flipped).length == 0;
  },

  //cria o card
  createCardsFromTechs: function () {
    this.cards = [];
    this.techs.forEach((tech) => {
      this.cards.push(this.createPairFromTech(tech));
    });
    //flatMap pega um array de array e desmembra fazendo apenas um array
    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.cards;
  },

  //cria o par de cada tecnologia
  createPairFromTech: function (tech) {
    return [
      {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
      },
      {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
      },
    ];
  },

  //cria o id aleatório
  createIdWithTech: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },

  //embaralhar cards
  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let ramdomIndex = 0;

    while (currentIndex !== 0) {
      ramdomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[ramdomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[ramdomIndex],
      ];
    }
  },
};
