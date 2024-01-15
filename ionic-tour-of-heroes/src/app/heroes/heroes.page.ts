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

  constructor(private modalCtrl: ModalController) {}

  selectHero(hero: Hero) {
    this.selectedHero = hero;
  }

  async openModal(heroId: number) {
    const modal = await this.modalCtrl.create({
      component: HeroCreateComponent,
      componentProps: {
        heroId: heroId,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    console.log(data, role);

    // edit are only temporarily
    if (role === 'create') {
      this.heroes.push(data);
      console.log(this.heroes);
    } else if (role === 'confirm') {
      const index = this.heroes.findIndex((hero) => hero.id === data.id);
      this.heroes[index] = data;
    }
  }
}
