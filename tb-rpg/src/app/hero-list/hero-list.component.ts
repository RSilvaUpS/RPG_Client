import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  private endpoint = "heroes";
  public heroes : any;

  constructor(private http:HttpClient) {

   }

  ngOnInit(): void {
    this.getHeroes()
  }

  private getHeroes(){
    this.http.get(`${environment.apiURL}${this.endpoint}`).subscribe((res) => {
      console.log(res)
      this.heroes = res
      this.heroes.map((hero) => {
        if(hero.portrait === null)
          hero.portrait = "https://as1.ftcdn.net/v2/jpg/02/75/12/14/1000_F_275121429_OdkywkN5Aq0To9cChBRhnjadvgpC98ZN.jpg"
      })
    })
  }

}
