import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BarcodeService } from '../../services/barcode.service';
import { environment } from '../../../environments/environment';
import { APP_CONFIG, IAppConfig } from '../../config/app.config';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss'],
})
export class QrGeneratorComponent implements OnInit {
  text = '';
  qrCode = '';
  constructor(
    private barcodeService: BarcodeService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) {}

  ngOnInit(): void {}

  generateQrCode() {
    this.barcodeService.generateQrCode(this.text).subscribe({
      next: (res) => {
        this.qrCode = res.data;
      },
    });
  }

  downloadQrCode() {
    window.open(this.config.endpoints.qr.download + '?text=' + this.text);
  }
}
