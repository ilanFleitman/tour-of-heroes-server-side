import { Component } from '@angular/core';
import {Hero} from './classes/hero';
import {HeroService} from './services/hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  heroes: Hero[] = [];
  id: number;
  name: string;

  constructor(private heroService: HeroService) {

  }

  showHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    })
  }

  deleteHero(heroId: number) {
    this.heroService.deleteHero(heroId).subscribe(next => {

    });
  }

  updateHero() {

  }

  addHero() {
    this.heroService.addHero(new Hero(this.id, this.name)).subscribe(() => {});
  }

}
