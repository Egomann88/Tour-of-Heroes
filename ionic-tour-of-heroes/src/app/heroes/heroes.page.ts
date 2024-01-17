import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../heroesMock';

import { AlertController, ModalController } from '@ionic/angular';
import { HeroManageComponent } from '../hero-manage/hero-manage.component';
import { createEmptyHero } from '../heroService';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-heroes',
  templateUrl: 'heroes.page.html',
  styleUrls: ['heroes.page.scss'],
})
export class HeroesPage {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private afFireStore: AngularFirestore
  ) {}

  ionViewDidEnter() {
    // fetch data from firebase
    this.afFireStore
      .collection('heroes')
      .snapshotChanges()
      .subscribe((res) => {
        let tmp: any = [];

        // map data from firebase to heroes
        res.forEach((hero) => {
          tmp.push({
            ...(hero.payload.doc.data() as Hero),
            id: hero.payload.doc.id,
          });
        });

        console.log(tmp);
        this.heroes = tmp;
      });
  }

  unpack = (hero: Hero) => ({ ...hero });

  findHero = (hero: Hero) => hero.id === this.selectedHero?.id;

  selectHero = (hero: Hero) => (this.selectedHero = hero);

  async createHero() {
    const response = await this.openModal('Erstellen', createEmptyHero);

    if (response.role != 'confirm') return;

    this.afFireStore.collection('heroes').add(response.data);
  }

  async editHero() {
    const response = await this.openModal('Aktualisieren', () =>
      this.unpack(this.heroes.find(this.findHero)!)
    );

    if (response.role != 'confirm') return;

    const index = this.heroes.findIndex(this.findHero);
    this.afFireStore
      .collection('heroes')
      .doc(this.heroes[index].id)
      .update(response.data);
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

      this.afFireStore
        .collection('heroes')
        .doc(this.heroes[index].id)
        .delete();
    } catch (e) {
      console.error(e);
    }
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
}
