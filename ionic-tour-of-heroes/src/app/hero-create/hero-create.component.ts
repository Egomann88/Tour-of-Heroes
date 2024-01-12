import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss'],
})
export class HeroCreateComponent {
  hero: Hero;

  constructor(private modalCtrl: ModalController) {
    this.hero = {
      id: 0,
      name: '',
    };
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.hero, 'confirm');
  }
}
