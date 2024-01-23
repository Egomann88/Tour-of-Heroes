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
  ) {
    this.checkLoginStatus();
  }

  manageLogin(func: (a: string, b: string) => any) {
    func(this.user.email, this.user.password)
      .then((res: any) => {
        this.showToast('Erfolgreich eingelogt!', 'success');

        console.log(res.user, 'res.user');

        // speichern in storage / datenbank
        let user: FirebaseUser = res.user._delegate;
        // setting the right providerData
        let userInfo: FirebaseUserInfo = {
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
        };

        user.providerData[0] = userInfo; // setting the right providerData

        this.storage.set('accessToken', user.accessToken);

        console.log(user, 'user');
        console.log(userInfo, 'userInfo');
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

  checkLoginStatus() {
    this.auth.onAuthStateChanged((user: any) => {
      if (user) {
        this.isLoggedIn = true;
        console.log('User is logged in');
      } else {
        this.isLoggedIn = false;
        this.loggedInData = {};
        console.log('User is logged out');
      }
    });
  }

  logout() {
    this.storage.remove('accessToken');
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
