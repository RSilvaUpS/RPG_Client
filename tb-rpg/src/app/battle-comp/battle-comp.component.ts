import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-battle-comp',
  templateUrl: './battle-comp.component.html',
  styleUrls: ['./battle-comp.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BattleCompComponent implements OnInit {

  @Input() hero;


  private enemyEndpoint = "Heroes/get-enemy";
  public enemy: any;
  public currentHeroHP = 0;
  public currentHeroMP = 0;
  public currentEnemyHP = 0;
  public gameWin: boolean = false;
  public gameLoss: boolean = false;
  public userAction = ''
  public userActionNumber: number = 0
  public enemyAction = ''
  public enemyActionNumber: number = 0
  public title = ''
  public message = ''

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.selectEnemy(this.hero.id, this.hero.hp, this.hero.mana)
  }

  public async selectEnemy(id, hp, mana) {
    this.currentHeroHP = hp;
    this.currentHeroMP = mana;

    this.http.get(`${environment.apiURL}${this.enemyEndpoint}/?id=${id}`).subscribe((res) => {
      console.log(res)
      this.enemy = res
      if (this.enemy.portrait === null)
        this.enemy.portrait = "https://as1.ftcdn.net/v2/jpg/02/75/12/14/1000_F_275121429_OdkywkN5Aq0To9cChBRhnjadvgpC98ZN.jpg"
      this.currentEnemyHP = this.enemy.hp;
    })
  }

  attack(ishero: boolean) {
    if (ishero) {
      let damage = this.getRndInteger(this.hero.attackMinimum, this.hero.attackMaximum);
      this.currentEnemyHP -= damage;
      this.checkEnding(true, this.currentEnemyHP);
      this.userAction = "Attack"
      this.userActionNumber = damage;
    }
    if (!this.gameWin && !this.gameLoss) {
      this.enemyTurn()
    }

  }

  castSpell(spellId, ishero: boolean) {
    if (ishero) {
      let spellCasted = this.hero.castableSpells.find(x => x.id == spellId)
      let damage = this.getRndInteger(spellCasted.damageMin, spellCasted.damageMin) * this.hero.spellModifier;
      if (spellCasted.SpellType == "Holy") {
        this.Heal(true, damage)
        this.currentHeroMP -= spellCasted.manaCost
        if (!this.gameWin && !this.gameLoss) {
          this.enemyTurn()
        }
      }
      else {
        this.spellCalc(true, damage)
        this.currentHeroMP -= spellCasted.manaCost
      }
      this.userAction = spellCasted.name;
      this.userActionNumber = damage;

    }
  }

  enemyTurn() {
    let choice = this.getRndInteger(1, 3)
    console.log(choice)
    switch (choice) {
      case 1:
        let damage = Math.floor(this.getRndInteger(this.enemy.attackMinimum, this.enemy.attackMaximum));
        this.currentHeroHP -= damage;
        this.checkEnding(false, this.currentHeroHP);
        this.enemyAction = 'Attack'
        this.enemyActionNumber = damage
        break;
      case 2:
        var spellCasted = this.enemy.castableSpells[Math.floor(Math.random() * this.enemy.castableSpells.length)]
        let spellDamage = Math.floor(this.getRndInteger(spellCasted.damageMin, spellCasted.damageMax));
        if (spellCasted.SpellType == 'Holy') {
          this.Heal(false, spellDamage)
          this.enemyAction = spellCasted.name
          this.enemyActionNumber = spellDamage
          break;
        }
        else {
          this.spellCalc(false, spellDamage)
          this.enemyAction = spellCasted.name
          this.enemyActionNumber = spellDamage
          break;
        }

    }
  }

  checkEnding(ishero, hp) {
    if (ishero && hp < 1) {
      this.gameWin = true;
      this.title = "A winner is you!"
      this.message = "Great job defeating the big evil villain, but your princess is in another castle"
    }
    if (!ishero && hp < 1) {
      this.gameLoss = true;
      this.title = "Fission Mailed"
      this.message = "Skill Issue"
    }
  }

  Heal(ishero, heal) {
    if (ishero) {
      var finalHealth = this.currentHeroHP + heal;
      if (finalHealth > this.hero.hp)
        this.currentHeroHP = this.hero.hp
      else {
        this.currentHeroHP = finalHealth
      }
    }
    else {
      var finalHealth = this.currentEnemyHP + heal;
      if (finalHealth > this.enemy.hp)
        this.currentEnemyHP = this.enemy.hp
      else {
        this.currentEnemyHP = finalHealth
      }
    }

  }

  spellCalc(ishero, damage) {
    if (ishero) {
      this.currentEnemyHP -= damage
      if (this.currentEnemyHP < 1)
        this.checkEnding(true, this.currentEnemyHP);
      if (!this.gameWin)
        this.enemyTurn()
    }
    if (!ishero) {
      this.currentHeroHP -= damage
      if (this.currentHeroHP < 1)
        this.checkEnding(false, this.currentHeroHP);
    }
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
