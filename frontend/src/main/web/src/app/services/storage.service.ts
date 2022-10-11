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

export interface FileFolder {
  id: string;
  linkcode: string;
  name: string;
  secure: string;
  directlink: string;
  type: string;
  path: string;
  size: string;
  downloadcount: string;
  mimetype: string;
  created: string;
  pwd: string;
  allow_follow: string;
  num_follower: string;
  children: FileFolder[];
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
