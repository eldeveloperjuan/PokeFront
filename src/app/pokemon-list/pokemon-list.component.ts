import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { getPokemons } from '../util';

import { Poke } from '../pokemon';
import { PokeService } from '../poke.service';
@Component({

  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokeFrontComponent {
  pokes: Poke[];

  constructor(private pokeService: PokeService) { }

  ngOnInit() {
    this.getPokes();
  }

  getPokes(): void {
    this.pokeService.getPokes()
    .subscribe(pokeList => {
      console.log(pokeList)
      this.pokes = pokeList});
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/