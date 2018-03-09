import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _gameService: GameService) { }

  private sub: any;

  private game: any;

  private id: any;

  private script: any;

  private socketId: any;

  ngOnInit() {
      this.socketId = socketId
  		this.sub = this.route.params.subscribe(params => {
      	this.id = params['id'];
      	//GET GAME FROM SERVICE BASED ON URL
        this._gameService.getGame(this.id).subscribe(data=>{
          console.log(data);
          if (data[0].white == this.socketId){
            playerColor = "white";
          }
          else if(data[0].black == this.socketId){
            playerColor = "black";
          }
          else (playerColor == "Viewing")
        })
        // this.loadInterfaceScript();
        initializeGame();
    });
  }

  loadInterfaceScript() {
    // let body = <HTMLDivElement> document.body;
    let body = document.getElementById('main')
    this.script = document.createElement('script');
    this.script.innerHTML = '';
    this.script.id = this.id
    this.script.src = '/assets/chessInterface/interface.js';
    // this.script.async = true;
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
