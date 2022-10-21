import { PreloadingStrategy, Route } from '@angular/router';
import { flatMap, Observable, of, timer } from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    const loadRoute = (delay: any) =>
      delay ? timer(7000).pipe(flatMap((_) => fn())) : fn();
    return route.data && route.data.preload
      ? loadRoute(route.data.delay)
      : of(null);
  }
}
