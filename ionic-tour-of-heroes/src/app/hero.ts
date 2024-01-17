export class Hero {
  id: string = "";  // id is set by firebase
  name: string;
  superPower?: string;

  constructor(name: string, superPower?: string) {
    this.name = name;
    this.superPower = superPower;
  }
}
