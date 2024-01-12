import { Component } from '@angular/core';
import { Settings } from '../settings';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class settingsPage {
  settings: Settings;

  constructor() {
    this.settings = {
      company: '',
      name: '',
      email: '',
    };
  }

  cancel() {
    console.log('Cancel clicked');
  }

  save() {
    console.log('Save clicked');
  }
}
