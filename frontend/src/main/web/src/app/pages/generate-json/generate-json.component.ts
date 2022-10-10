import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../../services/file.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-generate-json',
  templateUrl: './generate-json.component.html',
  styleUrls: ['./generate-json.component.scss'],
  providers: [MessageService],
})
export class GenerateJsonComponent implements OnInit {
  inputFiles: any[] = [];
  uploadedFileLists: any[] = [];
  jsonResponse = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private messageService: MessageService,
    private http: HttpClient,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.getUploadedFile();
  }

  generateJson = () => {
    // const reader = new FileReader();
    // const data = reader.readAsArrayBuffer(this.inputFiles[0].file);
    this.messageService.add({
      severity: 'info',
      summary: 'Successful',
      detail: '',
      key: 'chat',
    });
    console.log(this.inputFiles[0]);
  };

  chooseFile = (e: any) => {
    for (const file of e.files) {
      this.fileService.generateJson(file).subscribe((res) => {
        this.jsonResponse = JSON.stringify(res, null, '\t');
      });
    }
  };

  handleUpload = (e: any) => {
    console.log(e);
    this.fileService.generateJson(this.inputFiles[0]).subscribe((res) => {
      console.log(res);
    });
  };
  getUploadedFile = () => {
    this.uploadedFileLists = [];
  };

  uploadFile() {
    console.log('upload');
  }
}
