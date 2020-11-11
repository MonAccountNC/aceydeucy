export class Card {
    public image: string;
    public score: number;

    constructor(image: string = null, score: number = 0){
        this.image = image;
        this.score = score;
    }
}
