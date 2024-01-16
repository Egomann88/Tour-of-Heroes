export class Hero {
  id: number;
  name: string;
  superPower?: string;

  constructor(id: number, name: string, superPower?: string) {
    this.id = id;
    this.name = name;
    this.superPower = superPower;
  }
}
