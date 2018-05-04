import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as io from 'socket.io-client';

declare function setListeners(): any;
declare function updateGame(thismovelist): any;
declare function postGameData(data, cb): any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _gameService: GameService, private _router: Router, private _ngZone: NgZone) { 
    this.socket = io.connect();
    window['angularComponentRef'] = {component: this, zone: _ngZone};
  }

  CircularJSON: require('CircularJSON');

  socket: SocketIOClient.Socket;

  private sub: any;

  private game: any;

  private id: any;

  private script: any;

  playerColor: string;

  socketId: any;

  ngOnInit() {

    //

    //

    this.socket.on('playerConnected', function (data) {
      console.log("Player "+data+" connected!");
      //assign player
      this.socketId = data;
    });
    
    //receive move
    this.socket.on('receiveMove', function(dataBack){   
      console.log("Move Data :", dataBack)
      updateGame(CircularJSON.parse(dataBack).moveList);
      console.log("Updated board game!");
      postGameData(dataBack, (game)=>{
        // console.log("POST GAME DATA :", CircularJSON.parse(game.moveList));
        console.log("Game data sent to server!")
        setListeners();
      });
    });
		
    this.sub = this.route.params.subscribe(params => {
    	this.id = params['id'];
    	//GET GAME FROM SERVICE BASED ON URL
      this._gameService.getGame(this.id).subscribe(data=>{
        console.log(data);
        this.game = data[0]
        if (this.game.white == null && this.game.black == null) {
          this._router.navigate(['/']);
        }
        if (this.game.white == "taken"){
          this.playerColor = "white";
          this.game.white = "gameStarted";
        }
        else if(this.game.black == "taken"){
          this.playerColor = "black";
          this.game.black = "gameStarted";
        }
        else if (this.game.white == "gameStarted" && this.game.black == "gameStarted") {
          this.playerColor = "Viewing"
        }
        else if (this.game.white != "gameStarted" || this.game.black != "gameStarted") {
          this.playerColor = "Viewing"
        }
        this._gameService.updatePlayer(this.game).subscribe(data=>{
          console.log(data);  
          this.loadInterfaceScript();
          console.log(this.playerColor)
        })
      })
    });
  }

  // ngOnDestroy(){
  //   console.log(this.script.id);
  //   let temp = document.getElementById(this.script.id);
  //   temp.parentNode.removeChild(temp);
  // }

  //add socket functions here

  //send move
  sendMove(data) {
    // console.log('sending move: ', data);
    this.socket.emit('sendMove', data, function(cb){
      console.log(cb);
    });
  };

  loadInterfaceScript() {
    // let body = <HTMLDivElement> document.body;
    let body = document.getElementById('main')
    this.script = document.createElement('script');
    this.script.innerHTML = '';
    this.script.id = this.id+'/'+this.playerColor;
    this.script.src = '/assets/chessInterface/interface.js';
    this.script.async = true;
    this.script.defer = true;
    body.appendChild(this.script);
  }

}
