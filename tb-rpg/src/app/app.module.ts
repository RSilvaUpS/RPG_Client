import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { SpellListComponent } from './spell-list/spell-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GameComponentComponent } from './game-component/game-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroListComponent,
    SpellListComponent,
    NavBarComponent,
    GameComponentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
