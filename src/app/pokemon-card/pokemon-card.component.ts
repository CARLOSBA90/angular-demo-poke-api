import { Component } from '@angular/core';
import { PokeapiserviceService } from '../pokeapiservice.service';
import { Pokemon } from '../shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  pokemons: Pokemon[] = [];

  colorArray: { [key: string]: string } = {
    '10' : '#ff1f1f',
    '13' : '#fbd743',
    '6' : '#efcdaa',
    '11' : '#5db9ff'
  };


  constructor(private service: PokeapiserviceService){}

  ngOnInit(): void {
     this.list();
  }

  list(){
    this.service.getFourRandomPokemons().subscribe(
      pokemons => {
        if (pokemons && pokemons.length > 0) {
          this.service.getSprites(pokemons).subscribe(
            (pokemonsWithSprites: Pokemon[]) => {
              this.pokemons=pokemonsWithSprites;
            },
            error => {
              console.error("Error:", error);
            }
          );
        }
      }
    );
  }

}
