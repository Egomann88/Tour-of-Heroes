import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../heroesMock';

import { ModalController } from '@ionic/angular';
import { HeroManageComponent } from '../hero-manage/hero-manage.component';
import { createEmptyHero } from '../heroService';

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

  createHero() {
    this.openModal('Erstellen', createEmptyHero);
  }

  editHero() {
    this.openModal('Aktualisieren', () =>
      this.unpack(HEROES.find(this.findHero)!)
    );
  }

  deleteHero() {
    this.openModal('Entfernen', () => this.unpack(HEROES.find(this.findHero)!));
  }

  unpack = (hero: Hero) => ({ ...hero });

  findHero = (hero: Hero) => hero.id === this.selectedHero?.id;

  async openModal(msg: string, func: () => Object) {
    const modal = await this.modalCtrl.create({
      component: HeroManageComponent,
      componentProps: {
        msg: msg,
        func: func,
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
    } else if (role === 'delete') {
      this.selectedHero = undefined;
      const index = this.heroes.findIndex((hero) => hero.id === data.id);

      if (index !== -1) HEROES.splice(index, 1);
      else console.error('Hero not found. Index: ' + index);
    }
  }
}
