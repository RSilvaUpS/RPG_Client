import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.css']
})
export class SpellListComponent implements OnInit {

  private endpoint = "spells";
  public spells: any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getSpells();
  }

  private getSpells(){
    this.http.get(`${environment.apiURL}${this.endpoint}`).subscribe((res) => {
      console.log(res)
      this.spells = res
      this.spells.map((hero) => {
        if(hero.portrait === null)
          hero.portrait = "https://as1.ftcdn.net/v2/jpg/02/75/12/14/1000_F_275121429_OdkywkN5Aq0To9cChBRhnjadvgpC98ZN.jpg"
      })
    })
  }

}
