import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-battle-comp',
  templateUrl: './battle-comp.component.html',
  styleUrls: ['./battle-comp.component.css']
})
export class BattleCompComponent implements OnInit {

  @Input() hero;


  private enemyEndpoint = "Heroes/get-enemy";
  public enemy: any;
  public currentHeroHP = 0;
  public currentHeroMP = 0;
  public currentEnemyHP = 0;
  public currentEnemyMP = 0;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.selectEnemy(this.hero.id, this.hero.hp, this.hero.mana)
  }

  public async selectEnemy(id, hp, mana){
    this.currentHeroHP = hp;
    this.currentHeroMP = mana;

    this.http.get(`${environment.apiURL}${this.enemyEndpoint}/?id=${id}`).subscribe((res) => {
      console.log(res)
      this.enemy = res
      if(this.enemy.portrait === null)
        this.enemy.portrait = "https://as1.ftcdn.net/v2/jpg/02/75/12/14/1000_F_275121429_OdkywkN5Aq0To9cChBRhnjadvgpC98ZN.jpg"
      this.currentEnemyHP = this.enemy.hp;
      this.currentEnemyMP = this.enemy.mana;
    })
  }

  attack(){

  }
}
