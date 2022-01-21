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
    path: 'notes',
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
