import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
	//OTHER PATHS HERE
	{ path : '', pathMatch: 'full', component: MainComponent},
  	{ path : 'game/:id', component: GameComponent},	
  	{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }