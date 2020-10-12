import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Poke } from '../pokemon';
import { PokeService } from '../poke.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: [ './pokemon-detail.component.css' ]
})
export class PokeDetailComponent implements OnInit {
  poke: Poke;

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPoke();
  }

  getPoke(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pokeService.getPoke(id)
      .subscribe(poke => this.poke = poke);
  }

  goBack(): void {
    this.location.back();
  }
}
