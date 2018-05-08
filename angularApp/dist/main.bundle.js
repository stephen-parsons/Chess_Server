webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var game_component_1 = __webpack_require__("../../../../../src/app/game/game.component.ts");
var main_component_1 = __webpack_require__("../../../../../src/app/main/main.component.ts");
var routes = [
    //OTHER PATHS HERE
    { path: '', pathMatch: 'full', component: main_component_1.MainComponent },
    { path: 'game/:id', component: game_component_1.GameComponent },
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h1 {\n\ttext-align: center;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"height: 100%;\">\n\t<router-outlet></router-outlet>\n</div>\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var app_routing_module_1 = __webpack_require__("../../../../../src/app/app-routing.module.ts");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var game_component_1 = __webpack_require__("../../../../../src/app/game/game.component.ts");
var main_component_1 = __webpack_require__("../../../../../src/app/main/main.component.ts");
var game_service_1 = __webpack_require__("../../../../../src/app/game.service.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                game_component_1.GameComponent,
                main_component_1.MainComponent
            ],
            imports: [
                platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpClientModule, app_routing_module_1.AppRoutingModule
            ],
            providers: [game_service_1.GameService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "../../../../../src/app/game.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var GameService = /** @class */ (function () {
    function GameService(_http) {
        this._http = _http;
    }
    GameService.prototype.createGame = function (game) {
        return this._http.post("game/create", game);
    };
    GameService.prototype.getGame = function (id) {
        return this._http.get("game/get/" + id);
    };
    GameService.prototype.getAllGames = function () {
        return this._http.get("game/all");
    };
    GameService.prototype.updatePlayer = function (game) {
        return this._http.post("game/update/player", game);
    };
    GameService.prototype.deleteGame = function (id) {
        return this._http.delete(("game/delete/" + id));
    };
    GameService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;


/***/ }),

/***/ "../../../../../src/app/game/game.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#main {\n\tpadding-top: 10%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/game/game.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"main\">\n\t<div id=\"player\"></div>\n\t<div id=\"board\"></div>\n\t<div id=\"pieces\"></div>\n\t<div id=\"messages\"></div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/game/game.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var game_service_1 = __webpack_require__("../../../../../src/app/game.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var io = __webpack_require__("../../../../socket.io-client/lib/index.js");
var GameComponent = /** @class */ (function () {
    function GameComponent(route, _gameService, _router, _ngZone) {
        this.route = route;
        this._gameService = _gameService;
        this._router = _router;
        this._ngZone = _ngZone;
        this.CircularJSON = ('CircularJSON');
        this.socket = io.connect();
        window['angularComponentRef'] = { component: this, zone: _ngZone };
    }
    GameComponent.prototype.ngOnInit = function () {
        //
        var _this = this;
        //
        this.socket.on('playerConnected', function (data) {
            console.log("Player " + data + " connected!");
            //assign player
            this.socketId = data;
        });
        //receive move
        this.socket.on('receiveMove', function (dataBack) {
            console.log("Move Data :", dataBack);
            updateGame(dataBack.moveList, true);
            console.log("Updated board game!");
            setListeners();
        });
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            //GET GAME FROM SERVICE BASED ON URL
            _this._gameService.getGame(_this.id).subscribe(function (data) {
                console.log(data);
                _this.game = data[0];
                if (_this.game.white == null && _this.game.black == null) {
                    _this._router.navigate(['/']);
                }
                if (_this.game.white == "taken") {
                    _this.playerColor = "white";
                    _this.game.white = "gameStarted";
                }
                else if (_this.game.black == "taken") {
                    _this.playerColor = "black";
                    _this.game.black = "gameStarted";
                }
                else if (_this.game.white == "gameStarted" && _this.game.black == "gameStarted") {
                    _this.playerColor = "Viewing";
                }
                else if (_this.game.white != "gameStarted" || _this.game.black != "gameStarted") {
                    _this.playerColor = "Viewing";
                }
                _this._gameService.updatePlayer(_this.game).subscribe(function (data) {
                    console.log(data);
                    _this.loadInterfaceScript();
                    console.log(_this.playerColor);
                });
            });
        });
    };
    // ngOnDestroy(){
    //   console.log(this.script.id);
    //   let temp = document.getElementById(this.script.id);
    //   temp.parentNode.removeChild(temp);
    // }
    //add socket functions here
    //send move
    GameComponent.prototype.sendMove = function (data) {
        // console.log('sending move: ', data);
        this.socket.emit('sendMove', data, function (cb) {
            console.log(cb);
        });
    };
    ;
    GameComponent.prototype.loadInterfaceScript = function () {
        // let body = <HTMLDivElement> document.body;
        var body = document.getElementById('main');
        this.script = document.createElement('script');
        this.script.innerHTML = '';
        this.script.id = this.id + '/' + this.playerColor;
        this.script.src = '/assets/chessInterface/interface.js';
        this.script.async = true;
        this.script.defer = true;
        body.appendChild(this.script);
    };
    GameComponent = __decorate([
        core_1.Component({
            selector: 'app-game',
            template: __webpack_require__("../../../../../src/app/game/game.component.html"),
            styles: [__webpack_require__("../../../../../src/app/game/game.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, game_service_1.GameService, router_1.Router, core_1.NgZone])
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;


/***/ }),

/***/ "../../../../../src/app/main/main.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".outer {\n    display: table;\n    position: absolute;\n    height: 100%;\n    width: 100%;\n}\n\n.middle {\n    display: table-cell;\n    vertical-align: middle;\n}\n\n.inner {\n    margin-left: auto;\n    margin-right: auto; \n    width: auto; /*whatever width you want*/\n}\n\nh1 {\n\tmargin-bottom: 5%;\n}\n\nbutton {\n\tmargin-bottom: 10px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/main.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"outer\">\n  <div class=\"middle\">\n    <div class=\"inner text-center\">\n\n      <h1>Stephen's Chess Server</h1>\n\n      <h1>Let's Play</h1>\n\n      <p><button *ngIf=\"color==false\" (click)=\"selectColor()\">New game</button></p>\n      <p><button *ngIf=\"gotAllGames==false\" (click)=\"getGames()\">View available games</button></p>\n\n      <div *ngIf=\"color==true\" id='select-color'>\n      \t<h3>Select color: </h3>\n      \t<p><button (click)=\"onClickNewGame('white')\">White</button></p>\n      \t<p><button (click)=\"onClickNewGame('black')\">Black</button></p>\n      </div>\t\n\n      <div *ngIf=\"gotAllGames==true\" id=\"allGames\">\n      \t<table>\n      \t\t<tr>\n\t      \t\t<th>Game ID</th>\n\t      \t\t<th>White</th>\n\t      \t\t<th>Black</th>\n\t      \t\t<th>Action</th>\n            <th>Delete</th>\n      \t\t</tr>\n      \t\n      \t\t<tr *ngFor=\"let game of allGames; let i = index;\">\n      \t\t\t<td>{{game._id}}</td>\n      \t\t\t<td>{{game.white}}</td>\n      \t\t\t<td>{{game.black}}</td>\n      \t\t\t<!-- <td><a href=\"/game/{{game._id}}\"><button>Play!</button></a></td> -->\n      \t\t\t<td *ngIf=\"!game.white\"><button (click)=\"joinGame('white', game._id)\">Play as white!</button></td>\n      \t\t\t<td *ngIf=\"!game.black\"><button (click)=\"joinGame('black', game._id)\">Play as black!</button></td>\n      \t\t\t<td *ngIf=\"game.black && game.white\"><button (click)=\"viewGame(game._id)\">View game!</button></td>\n            <td><button (click)=\"deleteOneGame(i)\">Delete Game</button></td>\n      \t\t</tr>\n      \t</table>\n      </div>\n\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/main/main.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var game_service_1 = __webpack_require__("../../../../../src/app/game.service.ts");
var MainComponent = /** @class */ (function () {
    function MainComponent(_gameService, _router) {
        this._gameService = _gameService;
        this._router = _router;
    }
    MainComponent.prototype.ngOnInit = function () {
        this.game = { white: null, black: null };
        this.color = false;
        this.allGames = [];
        this.gotAllGames = false;
    };
    MainComponent.prototype.selectColor = function () {
        console.log(this.color);
        this.color = true;
        this.gotAllGames = false;
    };
    MainComponent.prototype.onClickNewGame = function (color) {
        this.createGameFromService(color);
    };
    MainComponent.prototype.createGameFromService = function (color) {
        var _this = this;
        // this.game.moveList = null;
        if (color == "white") {
            this.game.white = "taken";
        }
        else if (color == "black") {
            this.game.black = "taken";
        }
        this._gameService.createGame(this.game).subscribe(function (data) {
            console.log("DATA: " + data);
            _this.game = data;
            //USE ID AS GAME URL
            //PUT ._id FROM DATA INTO ROUTER PATH
            _this._router.navigate(['/game/' + _this.game._id]);
        });
    };
    MainComponent.prototype.getGames = function () {
        var _this = this;
        this.color = false;
        this._gameService.getAllGames().subscribe(function (data) {
            console.log(data);
            _this.allGames = data;
            if (_this.allGames.length != 0) {
                _this.gotAllGames = true;
            }
        });
    };
    MainComponent.prototype.joinGame = function (color, id) {
        var _this = this;
        this._gameService.getGame(id).subscribe(function (game) {
            _this.game = game[0];
            // console.log(game);
            if (color == "white") {
                if (_this.game.white == "taken") {
                    return;
                }
                else {
                    _this.game.white = "taken";
                }
            }
            else if (color == "black") {
                if (_this.game.black == "taken") {
                    return;
                }
                else {
                    _this.game.black = "taken";
                }
            }
            _this._gameService.updatePlayer(_this.game).subscribe(function (data) {
                console.log(data);
                _this._router.navigate(['/game/' + id]);
            });
        });
    };
    MainComponent.prototype.viewGame = function (id) {
        this._router.navigate(['/game/' + id]);
    };
    MainComponent.prototype.deleteOneGame = function (i) {
        var _this = this;
        if (confirm('Are you sure you want to delete this game?')) {
            this._gameService.deleteGame(this.allGames[i]._id).subscribe(function (data) {
                console.log(data.data);
                _this.allGames.splice(i, 1);
            });
        }
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'app-main',
            template: __webpack_require__("../../../../../src/app/main/main.component.html"),
            styles: [__webpack_require__("../../../../../src/app/main/main.component.css")]
        }),
        __metadata("design:paramtypes", [game_service_1.GameService, router_1.Router])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;


/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map