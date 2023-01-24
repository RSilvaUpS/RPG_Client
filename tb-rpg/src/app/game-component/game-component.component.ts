import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.css']
})
export class GameComponentComponent implements OnInit {

  private endpoint = "Heroes/playable";
  private enemyEndpoint = "Heroes/get-enemy";
  public heroes: any;
  public chosenHero : any;
  public enemy: any;
  public isListVisible = true;
  public heroisChosen = false;
  public currentHeroHP = 0;
  public currentHeroMP = 0;
  public currentEnemyHP = 0;
  public currentEnemyMP = 0;

  constructor(private http:HttpClient) { }

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

  public async heroChosen(id){
    this.chosenHero = this.heroes.find( x=> x.id == id)
    this.currentHeroHP = this.chosenHero.hp;
    this.currentHeroMP = this.chosenHero.mana;
    this.isListVisible = false
    this.heroisChosen = true

    this.http.get(`${environment.apiURL}${this.enemyEndpoint}/?id=${id}`).subscribe((res) => {
      console.log(res)
      this.enemy = res
      if(this.enemy.portrait === null)
        this.enemy.portrait = "https://as1.ftcdn.net/v2/jpg/02/75/12/14/1000_F_275121429_OdkywkN5Aq0To9cChBRhnjadvgpC98ZN.jpg"
      this.currentEnemyHP = this.enemy.hp;
      this.currentEnemyMP = this.enemy.mana;
    })

  }
}
