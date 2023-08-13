import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SafeHtml } from '@angular/platform-browser';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdDate: number;
  lastModifiedDate?: string;
  isEdit?: boolean;
  html?: SafeHtml;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  _notes = new BehaviorSubject<Note[]>([]);

  get notes() {
    return this._notes.asObservable();
  }

  addNote = (note: Note) => {
    return this.http.post<any>(`${environment.apiUrl}/notes/new`, {
      ...note,
      id: null,
      isEdit: null,
    });
  };
  getAllNotes = () => {
    return this.http.get<Note[]>(`${environment.apiUrl}/notes`);
  };
  deleteNote = (id: string) => {
    return this.http.delete(`${environment.apiUrl}/notes/${id}`, {});
  };
  editNote = (note: Note) => {
    return this.http.put(`${environment.apiUrl}/notes/${note.id}.json`, {
      ...note,
      id: null,
    });
  };
}
