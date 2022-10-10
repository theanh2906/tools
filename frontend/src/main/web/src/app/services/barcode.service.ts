import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root',
})
export class BarcodeService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) {}

  generateQrCode(text: string) {
    return this.http.get<any>(this.config.endpoints.qr.image, {
      params: {
        text,
      },
    });
  }
}
