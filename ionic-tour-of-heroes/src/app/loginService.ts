import { Injectable } from '@angular/core';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { StorageService } from './storageService';
import { FirebaseUser } from './firebaseUser';
import { FirebaseUserInfo } from './firebaseUserInfo';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  user: User = new User('', '');
  loggedInData: Object = new Object();

  constructor(
    private auth: AngularFireAuth,
    private toastCtrl: ToastController,
    private storage: StorageService
  ) {}

  manageLogin(func: (a: string, b: string) => any) {
    func(this.user.email, this.user.password)
      .then((res: any) => {
        this.showToast('Erfolgreich eingelogt!', 'success');

        console.log(res.user, 'res.user');

        // speichern in storage / datenbank
        let user: FirebaseUser = res.user._delegate;
        let userInfo: FirebaseUserInfo = res.user._delegate.providerData[0];
        this.storage.set('accessToken', res.user._delegate.accessToken);

        console.log(user, 'user');
        console.log(userInfo, 'userInfo');

        this.isLoggedIn = true;
      })
      .catch((e: Error) => {
        this.showToast('Falsche E-mail oder Passwort!', 'danger');
        console.error('Error during login:', e);
      });
  }

  register() {
    this.manageLogin((email: string, password: string) => {
      return this.auth.createUserWithEmailAndPassword(email, password);
    });
  }

  login() {
    this.manageLogin((email: string, password: string) => {
      return this.auth.signInWithEmailAndPassword(email, password);
    });
  }

  checkLoginStatus() {}

  logout() {
    this.storage.remove('accessToken');
    this.isLoggedIn = false;
    this.auth.signOut();
  }

  private showToast(message: string, color: string) {
    const toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      color: color,
      duration: 3000,
    });
    toast.then((toast) => toast.present());
  }
}
