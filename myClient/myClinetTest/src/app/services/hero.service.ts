import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Hero} from '../classes/hero';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HeroService {
  private headers: HttpHeaders = new HttpHeaders({'content-type' : 'application/json'});
  constructor(private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    return this.httpClient.get<Hero[]>('http://localhost:3000/heroes');
  }

  deleteHero(heroId: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/heroes/${ heroId }`);
  }

  addHero(hero: Hero) {
    return this.httpClient.post('http://localhost:3000/heroes', JSON.stringify(hero), {headers: this.headers});
  }
}
