import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroesPage } from './heroes.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HeroesPageRoutingModule } from './heroes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HeroesPageRoutingModule,
  ],
  declarations: [HeroesPage],
})
export class HeroesPageModule {}
