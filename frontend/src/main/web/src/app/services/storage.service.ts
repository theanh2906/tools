import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../config/app.config';

export interface Image {
  id: number;
  name: string;
  url: string;
  createdDate: string;
  lastModifiedDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) {}

  uploadFiles(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));
    return this.http.post<string>(
      `${this.config.endpoints.storage.uploadFiles}`,
      formData
    );
  }

  getAllFiles() {
    return this.http.get<Image[]>(
      `${this.config.endpoints.storage.getAllFiles}`
    );
  }

  deleteFile(id: number) {
    return this.http.delete(
      `${this.config.endpoints.storage.deleteFile}/${id}`
    );
  }

  deleteAllFiles() {
    return this.http.delete(`${this.config.endpoints.storage.deleteAllFiles}`);
  }
}
