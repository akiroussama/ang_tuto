import { ChangeDetectionStrategy, Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from '../../components/code-snippet.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, of } from 'rxjs';
// Fix: Import 'map' operator from 'rxjs/operators'.
import { switchMap, delay, tap, catchError, startWith, map } from 'rxjs/operators';

type RequestState<T> = { value: T | null; error: Error | null; loading: boolean; };

@Component({
  selector: 'app-api-signals-demo',
  standalone: true,
  imports: [CommonModule, CodeSnippetComponent],
  templateUrl: './api-signals-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiSignalsDemoComponent {
  private searchQuery$ = new Subject<string>();
  
  // Simulated backend data
  private mockData: { [key: string]: string[] } = {
    'angular': ['Angular Framework', 'Angular Material', 'Angular CLI'],
    'react': ['React.js', 'React Native', 'Redux'],
    'vue': ['Vue.js', 'Vuex', 'Nuxt.js'],
  };

  // This signal represents the state of our data fetching operation
  dataState = toSignal(
    this.searchQuery$.pipe(
      switchMap(query => {
        if (!query) {
          return of({ value: [], error: null, loading: false });
        }
        // Simulate a network request with cancellation
        return of(this.mockData[query.toLowerCase()] || []).pipe(
          delay(800), // simulate network latency
          tap(() => console.log(`Request for "${query}" completed.`)),
          map(results => ({ value: results, error: null, loading: false })),
          catchError(err => of({ value: null, error: err, loading: false })),
          startWith({ value: null, error: null, loading: true })
        );
      })
    ),
    {initialValue: { value: [], error: null, loading: false }}
  );

  codeSnippet = `
  // Stream of search queries from an input
  private searchQuery$ = new Subject<string>();

  // Use toSignal to convert an RxJS observable to a signal
  dataState = toSignal(
    this.searchQuery$.pipe(
      // switchMap cancels previous pending requests
      switchMap(query => {
        return this.apiService.search(query).pipe(
          map(results => ({ value: results, loading: false })),
          catchError(err => of({ error: err, loading: false })),
          startWith({ loading: true })
        );
      })
    ),
    // Provide an initial value for the signal
    { initialValue: { value: [], loading: false } }
  );

  // In template, just bind to the signal
  // @if(dataState().loading) { <p>Loading...</p> }
  `;

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    console.log(`New search query: "${query}"`);
    this.searchQuery$.next(query);
  }
}
