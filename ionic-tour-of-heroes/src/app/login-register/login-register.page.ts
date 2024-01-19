import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {
  user: User = new User('dasdasd@dasd.ch', '123456');
  isRegister: boolean = false;
  confirmTexts: string[] = ['Login', 'Registrieren'];
  confirmText: string = this.getConfirmText(); // + converts boolean to number
  formData: FormGroup;
  errors: any;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private alertCtrl: AlertController
  ) {
    this.formData = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z]+$'),
      ]),
      password: new FormControl(this.user.password, [
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
    this.user = this.formData.value;
    console.log(this.confirmText);

    if (this.isRegister) this.register();
    else this.login();
  }

  register() {
    this.auth
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res: any) => {
        console.log(res);

        this.alertCtrl.create({
          header: 'Erfolgreich registriert',
          message: 'Sie sie werden automatisch eingelogt.',
          buttons: ['OK'],
        });

        // access token speichern
        // ionic-storage verwenden

        // login ausführen

        // auf home page navigieren
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  login() {}

  goBack() {
    this.router.navigate(['/']);
  }
}
