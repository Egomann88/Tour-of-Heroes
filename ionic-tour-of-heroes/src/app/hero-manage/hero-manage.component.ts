import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-manage',
  templateUrl: './hero-manage.component.html',
  styleUrls: ['./hero-manage.component.scss'],
})
export class HeroManageComponent {
  hero: Hero;
  confirmText: string;

  constructor(
    private modalCtrl: ModalController,
    private propParams: NavParams
  ) {
    const msg = this.propParams.get('msg');
    const func = this.propParams.get('func');

    this.hero = func();
    this.confirmText = msg;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.hero.id == 0) return this.modalCtrl.dismiss(this.hero, 'create');
    else if (this.confirmText == 'Aktualisieren')  return this.modalCtrl.dismiss(this.hero, 'confirm');
    else return this.modalCtrl.dismiss(this.hero, 'delete');
  }
}
