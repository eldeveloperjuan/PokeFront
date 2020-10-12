import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { getPokemons } from "../util";

import { Poke } from "../pokemon";
import { ActivatedRoute, Router } from "@angular/router";
import { PokeService } from "../poke.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.css"]
})
export class PokeFrontComponent {
  pokes: Poke[];
  showPrevPage: boolean;
  showNextPage: boolean;

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokeService,
    private location: Location,
    private router : Router
  ) {}

  ngOnInit() {
    this.getPokes();
  }

  getPokes(): void {
    console.log('getPokes')
    this.showNextPage = true;
    this.showPrevPage = true;

    const page = +this.route.snapshot.paramMap.get("page");
    this.pokeService.getPokes(page).subscribe(pokeList => {
      this.showPrevPage = pokeList.previous && pokeList.previous.length > 0
      this.showNextPage = pokeList.next && pokeList.next.length > 0
      console.log(pokeList);
      this.pokes = pokeList;
    });
  }

  nextPage() {
    const page = +this.route.snapshot.paramMap.get("page");
    const nextPage = page + 1;
      this.pokeService.getPokes(nextPage).subscribe(pokeList => {
      console.log(pokeList);
      this.showPrevPage = pokeList.previous && pokeList.previous.length > 0     
      this.showNextPage = pokeList.next && pokeList.next.length > 0    
      this.pokes = pokeList;
      this.router.navigateByUrl("/" + nextPage);
    });
  }

    prevPage() {
    const page = +this.route.snapshot.paramMap.get("page");
    const nextPage = page - 1;
      this.pokeService.getPokes(nextPage).subscribe(pokeList => {
      console.log(pokeList);
      this.pokes = pokeList;
      this.showPrevPage = pokeList.previous && pokeList.previous.length > 0
      this.showNextPage = pokeList.next && pokeList.next.length > 0
      console.log(this.showPrevPage)      
      this.router.navigateByUrl("/" + nextPage);
    });
  }

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
