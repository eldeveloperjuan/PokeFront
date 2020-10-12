import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Poke } from './pokemon';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class PokeService {

  private pokeesUrl = 'https://pokeapi.co/api/v2/pokemon';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET pokees from the server */
  getPokes<Data>(page: number): Observable<Poke[]> {
    console.log('page', page)
    const pageNumber = page || 0
    const offset = 50 * pageNumber
    console.log('OFFSET', offset)
    return this.http.get<Poke[]>(this.pokeesUrl + '?limit=50&offset=' + offset)
      .pipe(
        tap(_ => this.log('fetched pokees')),
        catchError(this.handleError<Poke[]>('getpokees', []))
      );
  }

  /** GET poke by id. Return `undefined` when id not found */
  getPoke<Data>(id: number): Observable<Poke> {
    const url = `${this.pokeesUrl}/${id}`;
    return this.http.get<Poke>(url)
      .pipe(
        tap(poke => {
          const outcome = poke ? `fetched` : `did not find`;
          console.log(poke);
        }),
        catchError(this.handleError<Poke>(`getpoke id=${id}`))
      );
  }

  /* GET pokees whose name contains search term */
  searchpokees(term: string): Observable<Poke[]> {
    if (!term.trim()) {
      // if not search term, return empty poke array.
      return of([]);
    }
    return this.http.get<Poke[]>(`${this.pokeesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found pokees matching "${term}"`) :
         this.log(`no pokees matching "${term}"`)),
      catchError(this.handleError<Poke[]>('searchpokees', []))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
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