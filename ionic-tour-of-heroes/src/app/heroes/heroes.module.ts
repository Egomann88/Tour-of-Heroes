import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroesPage } from './heroes.page';

import { HeroesPageRoutingModule } from './heroes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeroesPageRoutingModule,
  ],
  declarations: [HeroesPage],
})
export class HeroesPageModule {}
