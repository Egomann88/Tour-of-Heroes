import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storageService';
import { LoginService } from '../loginService';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {
  isRegister: boolean = false;
  confirmTexts: string[] = ['Login', 'Registrieren'];
  confirmText: string = this.getConfirmText(); // + converts boolean to number
  formData: FormGroup;
  errors: any;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private toastCtrl: ToastController,
    private storage: StorageService,
    private loginService: LoginService
  ) {
    this.formData = new FormGroup({
      email: new FormControl('dasdasd@dasd.ch', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z]+$'),
      ]),
      password: new FormControl('123456', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {
    this.errors = {
      email: [
        { ErrorType: 'required', ErrorMessage: 'E-mail ist erforderlich.' },
        {
          ErrorType: 'pattern',
          ErrorMessage: 'Kein gültiges E-mail Format.',
        },
      ],
      password: [
        { ErrorType: 'required', ErrorMessage: 'Passwort ist erforderlich.' },
        {
          ErrorType: 'minlength',
          ErrorMessage: 'Passwort muss mindestens 6 Zeichen haben.',
        },
      ],
    };
  }

  switchPageMode() {
    this.isRegister = !this.isRegister;
    this.getConfirmText(); // update confirmText
    this.formData.reset();
  }

  getConfirmText() {
    return (this.confirmText = this.confirmTexts[+this.isRegister]);
  }

  onSubmit() {
    console.log(this.confirmText);
    this.loginService.user = this.formData.value;

    if (this.isRegister) this.loginService.register();
    else this.loginService.login();

    // if (this.loginService.isLoggedIn) this.goBack();
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
