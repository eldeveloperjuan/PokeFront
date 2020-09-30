import { Component } from '@angular/core';

import { pokemons } from '../pokemon';

@Component({
  selector: 'app-product-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokmeon-list.component.css']
})
export class PokeFrontComponent {
  pokemons = pokemons;
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/