import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

/*the Dependency Injection system sets the heroService parameter to the singleton instance of
HeroService at the creation of HeroesComponent.*/
  constructor(private heroService: HeroService) { }

  /*NgOnInit is a lifecycle hook that calls functions after constructing the component.
  It's not good practice to call functions in the constructors, which should be strictly
  reserved for wiring parameters to properties*/
  ngOnInit(): void {
    this.getHeroes();
  }

  /*Because the request to the server is asynchronous, we need to use the subscribe method
  that passes the emitted array to the callback, which sets the component's heroes property.*/
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
  	this.heroes = this.heroes.filter(h => h!== hero);
  	this.heroService.deleteHero(hero.id).subscribe();
  }
}
