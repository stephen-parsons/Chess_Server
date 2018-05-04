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

  private color: boolean;

  ngOnInit() {
  	this.game = {white: null, black: null};
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
      this.game.white = "taken";
    }
    else if (color == "black") {
      this.game.black = "taken";
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
      console.log(data);
      this.allGames = data;
      if (this.allGames.length != 0){
        this.gotAllGames = true;
      }
    })
  }

  joinGame(color, id){
    this._gameService.getGame(id).subscribe(game=>{
      this.game = game[0]
      // console.log(game);
      if (color == "white"){
        if (this.game.white == "taken"){
          return;
        }
        else {
          this.game.white = "taken";
        }
      }
      else if (color == "black") {
        if (this.game.black == "taken"){
          return;
        }
        else {
          this.game.black = "taken";
        }
      }
      this._gameService.updatePlayer(this.game).subscribe(data=>{
        console.log(data);  
        this._router.navigate(['/game/'+id]);
      })
    })
  }

  viewGame(id){
    this._router.navigate(['/game/'+id]);
  }

  deleteOneGame(i){
    if (confirm('Are you sure you want to delete this game?')) {
      this._gameService.deleteGame(this.allGames[i]._id).subscribe(data=>{
        console.log(data.data);
        this.allGames.splice(i, 1);  
      })
    }
  }

}
