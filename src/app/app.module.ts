import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokeapiserviceService } from './pokeapiservice.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
  ],
  providers: [
    PokeapiserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
