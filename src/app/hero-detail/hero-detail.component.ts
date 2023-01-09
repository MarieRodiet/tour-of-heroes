import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

  @Input() hero?: Hero;

	/*The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
	This component is interested in the route's parameters extracted from the URL.
	The "id" parameter is the id of the hero to display.

    The HeroService gets hero data from the remote server and this component uses it to get the hero-to-display.

	The location is an Angular service for interacting with the browser.
	This service lets you navigate back to the previous view.*/
  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location){}

  ngOnInit():void{
  	this.getHero();
  }

  getHero(): void {
    //Route parameters are always strings. The Number function converts the string to a number
  	const id= Number(this.route.snapshot.paramMap.get('id'));
  	this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void{
  // .back() navigates backward one step in the browser's history stack using the Location service
  	this.location.back();
  }

save(): void {
  if (this.hero) {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
}
