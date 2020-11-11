import { Card } from '../card/card';

export class Deck {
    private imageFolder = "assets/images/";
    public cards: Card[];
    public cardBack;

    // H, C, D, S
    // 2 - 10
    // J, Q, K, A

    constructor(){
       this.cardBack = new Card(this.imageFolder + "blue_back.png", 0);
        this.cards = [];
        let suits: string[] = ['H', 'C', 'D', 'S'];
        let card = new Card();
        suits.forEach(suit => {
            for(let i = 2; i < 15; i++) { // 13 cards
                if(i < 11){
                   card = new Card(this.imageFolder + i.toString() + suit + ".png", i); 
                }
                else if(i == 11) 
                    card = new Card(this.imageFolder + "J" + suit + ".png", i);
                else if(i == 12) 
                    card = new Card(this.imageFolder + "Q" + suit + ".png", i);
                else if(i == 13) 
                    card = new Card(this.imageFolder + "K" + suit + ".png", i);
                else if(i == 14) 
                    card = new Card(this.imageFolder + "A" + suit + ".png", i);
                this.cards.push(card);
            }
        });

        // this.cards.forEach(card => {
        //     console.log(card.image);
        // });
    }

    shuffle = function(){
        // go through each ordinal position
        // pick a random ordinal from first to current (ordinal+1)
        // swap them
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        // this.cards.forEach(card => {
        //     console.log(card.image);
        // });
    }
}
