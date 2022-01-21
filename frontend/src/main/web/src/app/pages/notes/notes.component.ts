import { Component, OnInit } from '@angular/core';
import { Note, NotesService } from '../../services/notes.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notesList: Note[] = [];
  editedNote!: Note;

  constructor(
    private notesService: NotesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.notesService
      .getAllNotes()
      .pipe(
        map((notes) => {
          notes.map((note) => {
            note.content = this.sanitizer.bypassSecurityTrustHtml(
              note.content
            ) as string;
          });
          return notes;
        })
      )
      .subscribe((res) => {
        this.notesList = res;
      });
  }

  deleteNote(id: string) {
    this.notesService.deleteNote(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  onSwitchMode(note: Note) {
    if (!note.isEdit) {
      this.editedNote = note;
    }
    this.editedNote.isEdit = !this.editedNote.isEdit;
  }

  onCreateNote(isCreated: boolean) {
    if (isCreated) {
      this.ngOnInit();
    }
  }

  onEdit(isEdit: boolean) {
    if (isEdit) {
      setTimeout(() => {
        this.ngOnInit();
      }, 500);
    }
  }
}
