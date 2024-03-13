import { Hero } from './hero';

export function createEmptyHero(): Hero {
  return new Hero(0, '');
}
