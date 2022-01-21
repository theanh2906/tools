import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of, timer} from 'rxjs';
import {flatMap} from 'rxjs/internal/operators';

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    const loadRoute = (delay: any) => delay ? timer(7000).pipe(flatMap(_ => fn())) : fn();
    return route.data && route.data.preload ? loadRoute(route.data.delay) : of(null);
  }

}
