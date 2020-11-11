import { Component, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Card } from 'src/app/card/card';
import { Deck } from 'src/app/deck/deck';

export enum Winners {Unset = 0, NoBet, House, Player, GameOver,  None, Pass,};
export enum ActionText{Unset = 0, None, Pass, Next};
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public deck: Deck;
  public card1: Card;
  public card2: Card;
  public card3: Card;
  public playerCard: Card;
  public bet: number;
  public winner: Winners;
  public winnings: number;
  public minimumBet: number;
  public nextButtonText: string;
  public cardMessage: string;
  private actionText: ActionText = ActionText.Unset;
  public actionTextEnum = ActionText;
  public PassDeal: string;
  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();
    this.winner = Winners.Unset;
   }


  ngOnInit(): void {
    this.winnings = 100;
    this.minimumBet = 10;
    this.bet = 10; 
    this.playGame();
  }

  setCardMessage(){
    switch(this.winner){
      case Winners.Player:
        this.cardMessage = "WON!";
        break;
      case Winners.House:
        this.cardMessage = "LOST!";
        break;
      case Winners.Unset:
        this.cardMessage = "Play Bet";
        break;
      case Winners.GameOver:
        this.cardMessage = "OVER!";
        break;
      case Winners.Pass:
        this.cardMessage = "Pass";
        break;
      case Winners.None:
        this.cardMessage = "";
        break;
    }
  }

  setButtonMessage(){
    if(this.winner == Winners.Unset){
      this.PassDeal = "Pass";
    }
    else{
      this.PassDeal = "Deal";
    }
  }

  playGame = function(){
    this.deck = new Deck();
    this.deck.shuffle();
    if(this.winnings == 0){
      this.winnings = 10;
    }
    this.showNewRound();
  }

  showNewRound = function(){
    if(this.deck.cards.length > 2 && this.winnings >= 0){
      this.card1 = this.deck.cards.shift();
      this.card2 = this.deck.cards.shift();
      this.playerCard = this.deck.cards.shift();
      this.card3 = this.deck.cardBack;
      this.cardMessage = "Play Bet";
      this.actionText = ActionText.Pass;
      this.setBet(this.bet);
      this.winner = Winners.Unset;
      this.setCardMessage();
      this.setButtonMessage();
    }
  }

  pass = function(){
    if(this.deck.cards.length < 3){
      this.winner = Winners.GameOver;
      this.setCardMessage();
      this.setButtonMessage();
    }
    else{
      if(this.winner == Winners.Pass){
        this.showNewRound();
      }
      else {
        this.card3 = this.playerCard;
        this.actionText = ActionText.Pass;
        this.winner = Winners.Pass;
        this.setCardMessage();
        this.setButtonMessage();
      }
    }
  }

  playPlayer = function(){
    if(this.winner == Winners.GameOver) return;

    if(this.ActionText != ActionText.Next){
      if(this.winner != Winners.Unset){
        this.actionText = ActionText.Pass;
        this.showNewRound();
      }
      else{
        this.card3 = this.playerCard;
        this.actionText = ActionText.Unset;
        if((this.card1.score < this.playerCard.score && this.card2.score > this.playerCard.score) ||
          (this.card1.score > this.playerCard.score && this.card2.score < this.playerCard.score)){
            this.winner = Winners.Player;
            this.winnings += this.bet;
          }
        else {
          this.winner = Winners.House;
          this.winnings -= this.bet;
        }

        this.setCardMessage();
      }


      if(this.deck.cards.length < 3 || this.winnings <= 0){
        this.winner = Winners.GameOver;
        this.actionText = ActionText.Next;
        this.setCardMessage();
      }
    }
    this.setButtonMessage();
  }

  changeBet = function(e){
    let b = 0;
    if(e.target){
      b = e.target.value;
    }
    else{
      b = e.value;
    }
    this.setBet(b);
    if(b == 0){
      this.actionText = ActionText.Pass;
    }
  }

  private setBet(bet){
    if(bet <= this.winnings)
      this.bet = Number(bet);
    else
      this.bet = this.winnings;
  }

  getActionText = function(val){
    return val == this.actionText;
    }
  
  isBetDisabled = function(){
    return this.winner != Winners.Unset;
  }


}

