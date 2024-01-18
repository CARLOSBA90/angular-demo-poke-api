import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, take } from 'rxjs';
import { Pokemon } from './shared/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeapiserviceService {

  private readonly baseUrl = "https://pokeapi.co/api/v2/";
  private response: any;

  constructor(
    private http : HttpClient
  ) { }

  /**
   * Obtiene listado de pokemons segun el tipo
   *
   * @param {TypePokemon} type
   * @return {*}
   * @memberof PokeapiserviceService
   */
  getTypePokemons(type: TypePokemon){
    return this.http.get<any>(this.baseUrl + `type/${type}`).pipe(map( x =>  {
      let res = x.pokemon.map((x:any) => {
        let str = x.pokemon.url;
        let idx = str.indexOf('pokemon/') + 8;
        str = str.slice(idx);
        let id = str.slice(0, -1);
        return { id : id , name : x.pokemon.name, type: type}
      });
      return res as {id:number, name:string, sprite:'', spriteHome:'', type:string} [];
    }));
  }

  getFirePokemons(){
    return this.getTypePokemons(TypePokemon.Fire);
  }
  getElectricPokemons(){
    return this.getTypePokemons(TypePokemon.Electric);
  }
  getRockPokemons(){
    return this.getTypePokemons(TypePokemon.Rock);
  }
  getWaterPokemons(){
    return this.getTypePokemons(TypePokemon.Water);
  }

  getPokemon(id : number){
      return this.http.get<any>(this.baseUrl + `pokemon/${id}`).pipe(map( res =>  {
        return {id: id,
                species: res.species?.name,
                sprite:res.sprites?.front_default,
                spriteHome: res.sprites?.other.home.front_default};
      })
    );
  }



   getSprites(pokemons: Pokemon[]): Observable<Pokemon[]> {
    const pokemonSpriteObservables = pokemons.map((pokemon) => {
      return this.getPokemon(pokemon.id).pipe(
        map(function(fetchedPokemon) {
          return { id:fetchedPokemon.id, sprite: fetchedPokemon.sprite };
        })
      );
    }, this);
    return forkJoin(pokemonSpriteObservables).pipe(
      map(function(spriteObjects) {
        return pokemons.map(function(pokemon) {
          return {
            ...pokemon,
            ...spriteObjects.find(function(obj) {
              return obj.id === pokemon.id;
            }),
          };
        });
      })
    );
  }




  getFourRandomPokemons(): Observable<Pokemon[]> {
    const pokemonObservables = [
      this.getFirePokemons(),
      this.getElectricPokemons(),
      this.getRockPokemons(),
      this.getWaterPokemons(),
    ];

    return forkJoin(pokemonObservables).pipe(
      map(pokemonLists => {
        const randomPokemons = [];
        for (const list of pokemonLists) {
          randomPokemons.push(this.getRandomPokemon(list));
        }
        return randomPokemons;
      }),
      take(4)
    );
  }


  getRandomPokemon(pokemons: Pokemon[]): Pokemon {
    return pokemons[Math.floor(Math.random() * pokemons.length)];
  }



}

enum TypePokemon {
  Fire = 10,
  Electric = 13,
  Rock = 6,
  Water = 11
}
