import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Image, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {
  allImages: Image[] = [];
  selectedFiles: File[] = [];
  uploadedFiles: any[] = [];
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private messageService: MessageService,
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.refreshImages();
  }

  refreshImages() {
    this.storageService.getAllFiles().subscribe((res) => {
      this.allImages = res;
    });
  }

  onUpload($event: any) {
    // this.storageService.uploadFiles(this.selectedFiles).subscribe({
    //   next: (res) => {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful upload files',
    //       detail: '',
    //     });
    //     window.location.reload();
    //   },
    //   error: (err) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error upload files',
    //       detail: '',
    //     });
    //   },
    // });
    this.uploadedFiles = [];
    for (let file of $event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Successful upload files',
      detail: '',
    });
    this.refreshImages();
  }

  deleteAllImages() {
    this.storageService.deleteAllFiles().subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => console.log(err),
    });
  }

  onSelect($event: any) {
    this.selectedFiles = $event.currentFiles;
  }

  onSend($event: any) {
    window.location.reload();
  }
}
