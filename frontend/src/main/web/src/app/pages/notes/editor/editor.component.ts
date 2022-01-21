import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note, NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @Output()
  createNoteEvent = new EventEmitter<boolean>();
  @Output()
  editNoteEvent = new EventEmitter<boolean>();
  @Input()
  editedNote!: Note;
  contentInputText = '';
  titleInputText = '';
  @Input()
  isEdit = false;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.contentInputText = this.editedNote ? this.editedNote.content : '';
    this.titleInputText = this.editedNote ? this.editedNote.title : '';
  }

  onCreateNote(title: string, content: string) {
    if (!title || !content) {
      return;
    }
    const note: Note = {
      id: '',
      title,
      content,
      createdDate:
        new Date().toLocaleDateString('vi') +
        ' ' +
        new Date().toLocaleTimeString(),
    };
    this.notesService.addNote(note).subscribe((res) => {
      this.contentInputText = '';
      this.titleInputText = '';
      this.createNoteEvent.emit(true);
    });
  }

  onClear() {
    this.titleInputText = '';
    this.contentInputText = '';
  }

  onEdit() {
    const id = this.editedNote.id;
    const editNote: Note = {
      id: this.editedNote.id,
      title: this.titleInputText,
      content: this.contentInputText,
      createdDate: this.editedNote.createdDate,
    };
    this.notesService.editNote(editNote).subscribe();
    this.editNoteEvent.emit(true);
  }
}
