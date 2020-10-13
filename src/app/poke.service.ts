import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Poke } from "./pokemon";
import { MessageService } from "./message.service";

@Injectable({ providedIn: "root" })
export class PokeService {
  private pokeesUrl = "https://pokeapi.co/api/v2/pokemon"; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  private fullPokeList: [string];
  /** GET pokees from the server */
  getPokes<Data>(page: number): Observable<Poke[]> {
    const pageNumber = page || 0;
    const offset = 50 * pageNumber;
    return this.http
      .get<Poke[]>(this.pokeesUrl + "?limit=50&offset=" + offset)
      .pipe(
        tap(_ => this.log("fetched pokees")),
        catchError(this.handleError<Poke[]>("getpokees", []))
      );
  }

  /** GET poke by id. Return `undefined` when id not found */
  getPoke<Data>(id: number): Observable<Poke> {
    const url = `${this.pokeesUrl}/${id}`;
    return this.http.get<Poke>(url).pipe(
      tap(poke => {
        const outcome = poke ? `fetched` : `did not find`;
      }),
      catchError(this.handleError<Poke>(`getpoke id=${id}`))
    );
  }

  getAllPokes<Data>(): Observable<Poke[]> {
    return this.http.get<Poke[]>(this.pokeesUrl + "?limit=1050").pipe(
      tap(_ => this.log("fetched pokees")),
      catchError(this.handleError<Poke[]>("getpokees", []))
    );
  }

  /* GET pokees whose name contains search term */
  searchPoke(term: string): number {
    if (!term.trim()) {
      // if not search term, return empty poke array.
      return;
    }
    if (this.fullPokeList && this.fullPokeList.length > 0) {
      const foundPoke = this.fullPokeList.filter(result => result.name == term);
      if (foundPoke && foundPoke.length > 0) {
        const idx1 = foundPoke[0].url.indexOf("pokemon/");
        const idx2 = foundPoke[0].url.indexOf("/", idx1 + 8);
        console.log(foundPoke[0].url.slice(idx1 + 8, idx2));
        return parseInt(foundPoke[0].url.slice(idx1 + 8, idx2));
      }
    }
    this.getAllPokes().subscribe(pokeList => {
      this.fullPokeList = pokeList.results;
      const foundPoke = pokeList.results.filter(result => result.name == term);
      if (foundPoke && foundPoke.length > 0) {
        const idx1 = foundPoke[0].url.indexOf("pokemon/");
        const idx2 = foundPoke[0].url.indexOf("/", idx1 + 8);
        console.log(foundPoke[0].url.slice(idx1 + 8, idx2));
        return parseInt(foundPoke[0].url.slice(idx1 + 8, idx2));
      }
    });
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`pokeService: ${message}`);
  }
}
