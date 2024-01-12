import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../hero';
import { HEROES } from '../heroesMock';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.page.html',
  styleUrls: ['./hero-details.page.scss'],
})
export class HeroDetailsPage implements OnInit {
  id?: number;
  hero?: Hero;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id')!;
      this.fetchHero();
    });
  }

  fetchHero() {
    // implement real fetch logic later with firebase
    this.hero = HEROES.find((hero) => hero.id == this.id);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
