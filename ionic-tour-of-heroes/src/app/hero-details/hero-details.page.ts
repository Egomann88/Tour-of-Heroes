import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.page.html',
  styleUrls: ['./hero-details.page.scss'],
})
export class HeroDetailsPage implements OnInit {
  id?: string;
  hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afFireStore: AngularFirestore
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.fetchHero();
    });
  }

  fetchHero() {
    this.afFireStore
      .collection('heroes')
      .snapshotChanges()
      .subscribe((res) => {
        // map data from firebase to heroes
        res.forEach((hero) => {
          if (hero.payload.doc.id == this.id) {
            this.hero = {
              ...(hero.payload.doc.data() as Hero),
              id: hero.payload.doc.id,
            };
          }
        });
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
