import { Injectable } from '@angular/core';
import { Hero } from './hero';
//Observable: represents the idea of an invokable collection of future values or events.
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


//Decorator that marks a class as available to be provided and injected as a dependency.
@Injectable({
/*When you provide the service at the root level, Angular creates a single,
shared instance of HeroService and injects into any class that asks for it.*/
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor( private http: HttpClient, private messageService: MessageService) { }

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

		// TODO: send the error to remote logging infrastructure
		console.error(error); // log to console instead

		// TODO: better job of transforming error for user consumption
		this.log(`${operation} failed: ${error.message}`);

		// Let the app keep running by returning an empty result.
		return of(result as T);
	  };
	}


  /*HeroService returns Observable<Hero[]> so that the component can use HttpClient.get() method to fetch
  the heroes as a single value, the array of mock heroes*/
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
		.pipe(
			tap(_ => this.log('fetched heroes')),
			catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

	//returns an Observable<Hero>
	/** GET hero by id. Will 404 if id not found */
	getHero(id: number): Observable<Hero> {
	  const url = `${this.heroesUrl}/${id}`;
	  return this.http.get<Hero>(url).pipe(
		tap(_ => this.log(`fetched hero id=${id}`)),
		catchError(this.handleError<Hero>(`getHero id=${id}`))
	  );
	}

	  /** Log a HeroService message with the MessageService */
	  private log(message: string) {
		this.messageService.add(`HeroService: ${message}`);
	  }

	/** PUT: update the hero on the server */
	updateHero(hero: Hero): Observable<any> {
	  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
		tap(_ => this.log(`updated hero id=${hero.id}`)),
		catchError(this.handleError<any>('updateHero'))
	  );
	}

	/**POST: add a new hero to the server */
	addHero(hero: Hero): Observable<Hero>{
		return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
		tap((newHero: Hero) => this.log(`added hero w/ id!${newHero.id}`)),
		catchError(this.handleError<Hero>('addHero'))
		);
	}

	/**DELETE: delete the hero from the server*/
	deleteHero(id: number): Observable<Hero>{
		const url = `${this.heroesUrl}/${id}`;
		return this.http.delete<Hero>(url, this.httpOptions).pipe(
		tap(_=> this.log(`deleted hero id=${id}`)),
		catchError(this.handleError<Hero>('deleteHero'))
		);
	}

	/* GET heroes whose name contains search term */
    searchHeroes(term: string): Observable<Hero[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
        tap(x => x.length ?
           this.log(`found heroes matching "${term}"`) :
           this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    }

}
