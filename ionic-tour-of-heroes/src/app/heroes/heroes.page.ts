import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../heroesMock';



@Component({
  selector: 'app-heroes',
  templateUrl: 'heroes.page.html',
  styleUrls: ['heroes.page.scss'],
})
export class HeroesPage {
  heroes = HEROES;
  selectedHero?: Hero;
  message = 'Hello World, '; // TODO: remove this ; test for modal

  constructor(private modalCtrl: ModalController) {
    console.log(this.heroes);
  }

  selectHero(hero: Hero) {
    this.selectedHero = hero;
  }

}
