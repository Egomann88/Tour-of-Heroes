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
    }
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
