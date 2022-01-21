import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import * as htmlToImage from 'html-to-image';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  userPassword = 'nathor1996';
  names: string[] = [
    'Danh',
    'Thuận',
    'Ý & Đạt',
    'Kiệt',
    'Quyên',
    'Long',
    'Vương',
    'Kim',
  ];
  invoice: FormGroup | undefined;
  selectedName: string | any;
  startDate: Date = new Date();
  endDate: Date = new Date();
  now: Date | any;
  month = this.endDate.getMonth() + 1;
  matcher = new MyErrorStateMatcher();
  selectedNameControl = new FormControl('', [Validators.required]);
  money = 0;
  moneyControl = new FormControl('', [Validators.required]);
  password: string | any;

  constructor() {}

  ngOnInit(): void {
    this.now = Date.now();
  }

  exportImage = () => {
    htmlToImage
      .toPng(document.getElementById('capture') as HTMLElement, {
        quality: 1,
        backgroundColor: 'white',
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${this.selectedName.replace(/\s/g, '_')}.png`;
        link.href = dataUrl;
        link.click();
      });
  };
  formatNumber = (num: number) => {
    return String(num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
}
