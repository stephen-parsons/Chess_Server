import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _gameService: GameService, private _router: Router) { }

  private game: any;

  private allGames: any

  private gotAllGames: any

  private color: any;

  ngOnInit() {
  	this.game = {};
    this.color = false;
    this.allGames = [];
    this.gotAllGames = false;
  }

  selectColor(){
    console.log(this.color);
    this.color = true;
    this.gotAllGames = false;
  }

  onClickNewGame(color){
  	this.createGameFromService(color);
  }

  createGameFromService(color){
   	// this.game.moveList = null;
    if (color == "white"){
      this.game.white = socketId;
    }
    else if (color == "black") {
      this.game.black = socketId;
    }
  	this._gameService.createGame(this.game).subscribe(data=>{
  		console.log("DATA: "+data);
      this.game = data;
  		//USE ID AS GAME URL
  		//PUT ._id FROM DATA INTO ROUTER PATH
  		this._router.navigate(['/game/'+this.game._id]);
  	})
  }

  getGames(){
    this.color = false;
    this._gameService.getAllGames().subscribe(data=>{
      // console.log(data);
      this.allGames = data;
      if (this.allGames.length != 0){
        this.gotAllGames = true;
      }
    })
  }

  joinGame(color, id){
    this._gameService.getGame(id).subscribe(game=>{
      game = game[0]
      // console.log(game);
      if (color == "white"){
        game.white = socketId;
      }
      else if (color == "black") {
        game.black = socketId;
      }
      this._gameService.updatePlayer(game).subscribe(data=>{
        console.log(data);  
        this._router.navigate(['/game/'+id]);
      })
    })
  }

}
