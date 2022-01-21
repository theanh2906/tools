import { Component, OnInit } from '@angular/core';
import { StringUtils } from '../../helpers/string-utils';

@Component({
  selector: 'app-change-case',
  templateUrl: './change-case.component.html',
  styleUrls: ['./change-case.component.scss'],
})
export class ChangeCaseComponent implements OnInit {
  choice: 'upper' | 'lower' | 'title' | 'camel' | 'kebab' | 'minify' = 'upper';
  text: string | any;

  constructor() {}

  ngOnInit(): void {}

  handleChangeCasesClick = () => {
    switch (this.choice) {
      case 'lower':
        this.text = this.text.toLowerCase();
        break;
      case 'upper':
        this.text = this.text.toUpperCase();
        break;
      case 'title':
        this.text = StringUtils.toTitleCase(this.text);
        break;
      case 'camel':
        this.text = StringUtils.toCamelCase(this.text);
        break;
      case 'kebab':
        this.text = StringUtils.toKebab(this.text);
        break;
      case 'minify':
        this.text = StringUtils.minify(this.text);
        break;
    }
  };
}
