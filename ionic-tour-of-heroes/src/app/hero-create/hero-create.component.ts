import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Hero } from '../hero';
import { HEROES } from '../heroesMock';
import { createEmptyHero } from '../heroService';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss'],
})
export class HeroCreateComponent {
  hero: Hero;
  confirmText: string;

  constructor(
    private modalCtrl: ModalController,
    private propParams: NavParams
  ) {
    let heroId = this.propParams.get('heroId');

    if (heroId == 0) {
      this.hero = createEmptyHero();
      this.confirmText = 'Erstellen';
      return;
    }

    // make new hero object to avoid mutating the original -> { ...this.hero }
    this.hero = { ...HEROES.find((hero) => hero.id === heroId)! };
    this.confirmText = 'Aktualisieren';
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.hero.id == 0) return this.modalCtrl.dismiss(this.hero, 'create');
    else return this.modalCtrl.dismiss(this.hero, 'confirm');
  }
}
