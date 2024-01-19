import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LoginRegisterPageRoutingModule } from './login-register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRegisterPage } from './login-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginRegisterPageRoutingModule,
  ],
  declarations: [LoginRegisterPage],
})
export class LoginRegisterPageModule {}
