import { Component, OnInit } from '@angular/core';
import { Note, NotesService } from '../../services/notes.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notesList = new Observable<Note[]>();
  editedNote!: Note;

  constructor(
    private notesService: NotesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.notesList = this.notesService.getAllNotes().pipe(
      map((notes) => {
        notes.map((note) => {
          note.content = this.sanitizer.bypassSecurityTrustHtml(
            note.content
          ) as string;
        });
        return notes;
      })
    );
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
