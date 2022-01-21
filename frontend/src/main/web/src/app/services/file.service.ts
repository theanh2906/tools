import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type UploadedFile = {
  name?: string;
  url?: string;
};

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  generateJson(file: File): Observable<any> {
    const formData = new FormData();
    formData.set('file', file);
    return this.http.post<any>(
      `${environment.apiUrl}/helpers/generate-json`,
      formData
    );
  }

  getFileByName(name: string): Observable<UploadedFile> {
    return new Observable<UploadedFile>();
  }
}
