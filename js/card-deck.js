class CardDeck {
    constructor(deckContainer){
        this.deckContainer = deckContainer;
        this.possibleRoles = [];
        this.cards = [];

        this.clicable = true;

        console.log(this.deckContainer.querySelectorAll("[data-card-type]"));

        for(this.tempCard of this.deckContainer.querySelectorAll("[data-card-type]")){
            this.cards.push(this.tempCard);
            this.possibleRoles.push(this.tempCard.getAttribute('data-card-type'));
        }

        this.cards.forEach((card) => {
            card.addEventListener("click", () => {
                if(this.clicable){
                    this.shuffle();
                    this.clicable = false;
                    setTimeout(() => {
                        this.clicable = true;
                    }, 700);
                }
                
            })
        })
    }

    shuffle(){
        this.possibleRoles.unshift(this.possibleRoles.pop());
        for(let i = 0; i < this.cards.length; i++){
            if(!this.cards[i].classList.contains("animated")){
                this.cards[i].classList.add("animated");
            }
            this.cards[i].setAttribute("data-card-type", this.possibleRoles[i]);
        }
    }
}

const deckContainer1 = document.querySelector('[data-card-deck="1"]');
const deck1 = new CardDeck(deckContainer1);

const deckContainer2 = document.querySelector('[data-card-deck="2"]');
const deck2 = new CardDeck(deckContainer2);