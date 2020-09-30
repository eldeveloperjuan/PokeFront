import { Component } from '@angular/core';
import { pokemons } from '../pokemon';
import { getPokemons } from '../util';


@Component({
  selector: 'app-product-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokeFrontComponent {
  pokemons = getPokemons();
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/