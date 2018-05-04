import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameService {

  constructor(private _http: HttpClient) {}

  createGame(game){
  	return this._http.post("game/create", game);
  }

  getGame(id){
  	return this._http.get("game/get/"+id)
  }

  getAllGames(){
  	return this._http.get("game/all");
  }

  updatePlayer(game){
    return this._http.post("game/update/player", game)
  }

  deleteGame(id){
    return this._http.delete(("game/delete/"+id))
  }

}
