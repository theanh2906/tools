import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { AngularMaterialModule } from '../material.module';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from '../pages/invoice/invoice.component';
import { ChangeCaseComponent } from '../pages/change-case/change-case.component';
import { PrimengModule } from '../primeng.module';
import { CalendarComponent } from '../pages/calendar/calendar.component';
import { AuthenticationComponent } from '../pages/authentication/authentication.component';
import { AuthGuard } from '../auth/auth.guard';
import { NotesComponent } from '../pages/notes/notes.component';
import { GenerateJsonComponent } from '../pages/generate-json/generate-json.component';
import { StorageComponent } from '../pages/storage/storage.component';
import { QrGeneratorComponent } from '../pages/qr-generator/qr-generator.component';
import { ChatComponent } from '../pages/chat/chat.component';
import { AdminComponent } from '../pages/admin/admin.component';
import { VideoCallComponent } from '../pages/video-call/video-call.component';

const appRoute: Routes = [
  {
    path: 'invoice',
    component: InvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-cases',
    component: ChangeCaseComponent,
  },
  {
    path: 'generate-json',
    component: GenerateJsonComponent,
  },
  {
    path: 'note',
    component: NotesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  {
    path: 'storage',
    component: StorageComponent,
  },
  {
    path: 'qr-generator',
    component: QrGeneratorComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'video-call',
    component: VideoCallComponent,
  },
];

@NgModule({
  declarations: [MenuBarComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PrimengModule,
    RouterModule.forRoot(appRoute, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [MenuBarComponent],
})
export class GeneralComponentsModule {}
