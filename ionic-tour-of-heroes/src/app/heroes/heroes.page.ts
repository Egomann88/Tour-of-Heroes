import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../heroesMock';

import { ModalController } from '@ionic/angular';
import { HeroCreateComponent } from '../hero-create/hero-create.component';

@Component({
  selector: 'app-heroes',
  templateUrl: 'heroes.page.html',
  styleUrls: ['heroes.page.scss'],
})
export class HeroesPage {
  heroes = HEROES;
  selectedHero?: Hero;

  constructor(private modalCtrl: ModalController) {
    console.log(this.heroes);
  }

  selectHero(hero: Hero) {
    this.selectedHero = hero;
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: HeroCreateComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    console.log(data, role);

    if (role === 'confirm') {
      this.heroes.push(data); // temporarily add to heroes array
    }
  }
}
