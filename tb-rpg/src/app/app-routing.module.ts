import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpellListComponent } from './spell-list/spell-list.component';

const routes: Routes = [
  {path : "", component: HomeComponent},
  {path: 'heroes', component: HeroListComponent},
  {path: 'spells', component: SpellListComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
