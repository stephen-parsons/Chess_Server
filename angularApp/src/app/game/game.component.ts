import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _gameService: GameService, private _router: Router) { 
    this.socket = io.connect();
  }

  socket: SocketIOClient.Socket;

  private sub: any;

  private game: any;

  private id: any;

  private script: any;

  playerColor: string;

  socketId: any;

  ngOnInit() {
    this.socket.on('playerConnected', function (data) {
      console.log("Player "+data+" connected!");
      //assign player
      this.socketId = data;
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
        this._gameService.updatePlayer(this.game).subscribe(data=>{
          console.log(data);  
          this.loadInterfaceScript();
          console.log(this.playerColor)
        })
      })
    });
  }

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

  // loadConnectGameScript() {
  //   let head = <HTMLDivElement> document.head;
  //   this.script = document.createElement('script');
  //   this.script.innerHTML = '';
  //   this.script.id = this.id
  //   this.script.src = '/assets/angular-socket-script.js';
  //   this.script.async = true;
  //   this.script.defer = true;
  //   head.appendChild(this.script);
  // }

  //

}
