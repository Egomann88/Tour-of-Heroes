import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailsPage } from './hero-details.page';

describe('HeroDetailsPage', () => {
  let component: HeroDetailsPage;
  let fixture: ComponentFixture<HeroDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HeroDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
