export class User {
  id: string = '';  // id is set by firebase
  email: string;
  password: string;
  
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}