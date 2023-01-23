import { HeroListComponent } from './hero-list/hero-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpellListComponent } from './spell-list/spell-list.component';

const routes: Routes = [
  {path: 'heroes', component: HeroListComponent},
  {path: 'spells', component: SpellListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
