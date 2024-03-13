import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../heroesMock';

import { AlertController, ModalController } from '@ionic/angular';
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

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  unpack = (hero: Hero) => ({ ...hero });

  findHero = (hero: Hero) => hero.id === this.selectedHero?.id;

  selectHero = (hero: Hero) => (this.selectedHero = hero);

  async createHero() {
    const response = await this.openModal('Erstellen', createEmptyHero);

    if (response.role != 'confirm') return;

    this.heroes.push(response.data);
  }

  async editHero() {
    const response = await this.openModal('Aktualisieren', () =>
      this.unpack(HEROES.find(this.findHero)!)
    );

    if (response.role != 'confirm') return;

    const index = this.heroes.findIndex(this.findHero);
    this.heroes[index] = response.data;
  }

  async openModal(msg: string, func: () => Object) {
    const modal = await this.modalCtrl.create({
      component: HeroManageComponent,
      componentProps: {
        msg: msg,
        func: func,
      },
    });
    modal.present();

    return await modal.onWillDismiss();
  }

  async openChoiceAlert(title: string, msg?: string, funcs?: Function[]) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            funcs?.[0]();
          },
        },
        {
          text: 'Bestätigen',
          role: 'confirm',
          handler: () => {
            funcs?.[1]();
          },
        },
      ],
    });

    alert.present();

    return await alert.onDidDismiss();
  }

  async deleteHero() {
    const response = await this.openChoiceAlert(
      'Notiz löschen',
      'Willst du diesen Helden wirklich löschen?'
    );

    if (response.role != 'confirm') return;

    try {
      const index = this.heroes.findIndex(this.findHero);
      this.selectedHero = undefined;

      this.heroes.splice(index, 1);
    } catch (e) {
      console.error(e);
    }
  }
}
