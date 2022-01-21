import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CachesService {
  private previousUrl = '';

  constructor(private route: ActivatedRoute) {}

  getPreviousUrl = () => {
    return this.previousUrl;
  };
  setPreviousUrl = (url: string) => {
    this.previousUrl = url;
  };
  // getPageTitle = () => {
  //   this.route
  // }
}
