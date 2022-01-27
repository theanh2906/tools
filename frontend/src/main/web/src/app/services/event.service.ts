import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventInput } from '@fullcalendar/common';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

export interface EventData {
  title: string;
  allDay: boolean;
  start: string;
  end: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  _events = new BehaviorSubject<EventInput[]>([]);

  get events() {
    return this._events.asObservable();
  }

  getEvents = () => {
    return this.http.get<EventInput[]>(`${environment.apiUrl}/events`).pipe(
      tap((events) => {
        this._events.next(events);
      })
    );
  };
  getEventsTableData = () => {
    return this.http.get<any>(`${environment.apiUrl}/events`);
  };
  addEvent = (event: EventInput) => {
    return this.http.post<any>(`${environment.apiUrl}/events/new`, event);
  };
  deleteEvent = (eventId: string) => {
    return this.http.delete(`${environment.apiUrl}/events/${eventId}.json`);
  };
}
