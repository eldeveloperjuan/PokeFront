import { Component } from "@angular/core";
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
  search: string;

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokeService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPokes();
    this.search = "";
  }

  getPokes(): void {
    this.showNextPage = true;
    this.showPrevPage = true;
    const page = +this.route.snapshot.paramMap.get("page");
    this.pokeService.getPokes(page).subscribe(pokeList => {
      this.showPrevPage = pokeList.previous && pokeList.previous.length > 0;
      this.showNextPage = pokeList.next && pokeList.next.length > 0;
      this.pokes = pokeList;
    });
  }

  nextPage() {
    const page = +this.route.snapshot.paramMap.get("page");
    const nextPage = page + 1;
    this.pokeService.getPokes(nextPage).subscribe(pokeList => {
      this.showPrevPage = pokeList.previous && pokeList.previous.length > 0;
      this.showNextPage = pokeList.next && pokeList.next.length > 0;
      this.pokes = pokeList;
      this.router.navigateByUrl("/" + nextPage);
    });
  }

  prevPage() {
    const page = +this.route.snapshot.paramMap.get("page");
    const nextPage = page - 1;
    this.pokeService.getPokes(nextPage).subscribe(pokeList => {
      this.pokes = pokeList;
      this.showPrevPage = pokeList.previous && pokeList.previous.length > 0;
      this.showNextPage = pokeList.next && pokeList.next.length > 0;
      this.router.navigateByUrl("/" + nextPage);
    });
  }

  searchChange(searchText) {
    const pokeId = this.pokeService.searchPoke(searchText);
    if (pokeId > 0) {
      console.log('inside')
      this.router.navigateByUrl("/detail/" + pokeId);
    }

    console.log(pokeId);
  }
}
