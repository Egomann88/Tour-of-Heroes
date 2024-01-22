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
  user: User = new User('dasdasd@dasd.ch', '123456');
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

    if (this.loginService.isLoggedIn) this.goBack();
  }

  register() {
    this.auth
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res: any) => {
        this.showToast(
          'Erfolgreich registriert! Sie sie werden automatisch eingelogt.',
          'success'
        );

        this.storage.set('accessToken', res.user._delegate.accessToken);
        this.loginService.isLoggedIn = true;
      })
      .catch((e: Error) => {
        this.showToast('Falsche E-mail oder Passwort!', 'danger');
        console.log(e);
      });
  }

  login() {
    this.auth
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then((res: any) => {
        this.showToast('Erfolgreich eingelogt!', 'success');
        this.storage.set('accessToken', res.user._delegate.accessToken);
        this.loginService.isLoggedIn = true;
      })
      .catch((e: Error) => {
        this.showToast('Falsche E-mail oder Passwort!', 'danger');
        console.error('Error during login:', e);
      });
  }

  showToast(message: string, color: string) {
    const toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      color: color,
      duration: 3000,
    });
    toast.then((toast) => toast.present());
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
