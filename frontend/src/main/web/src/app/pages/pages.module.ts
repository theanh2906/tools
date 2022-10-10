import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice/invoice.component';
import { AngularMaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeCaseComponent } from './change-case/change-case.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { GenerateJsonComponent } from './generate-json/generate-json.component';
import { PrimengModule } from '../primeng.module';
import { HttpClientModule } from '@angular/common/http';
import {
  AllEventsComponent,
  CalendarComponent,
  EventsDialogComponent,
} from './calendar/calendar.component';
import { GeneralComponentsModule } from '../general-components/general-components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MessageService } from 'primeng/api';
import { NotesComponent } from './notes/notes.component';
import { EditorComponent } from './notes/editor/editor.component';
import { RedirectComponent } from './redirect/redirect.component';
import { StorageComponent } from './storage/storage.component';
import { PipesModule } from "../pipes/pipes.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { QrGeneratorComponent } from './qr-generator/qr-generator.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    InvoiceComponent,
    ChangeCaseComponent,
    GenerateJsonComponent,
    CalendarComponent,
    EventsDialogComponent,
    AllEventsComponent,
    AuthenticationComponent,
    NotesComponent,
    EditorComponent,
    RedirectComponent,
    StorageComponent,
    QrGeneratorComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    HttpClientModule,
    GeneralComponentsModule,
    DragDropModule,
    PipesModule,
    NgxSpinnerModule,
  ],
  providers: [MessageService],
})
export class PagesModule {}
