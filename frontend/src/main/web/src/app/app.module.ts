import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { GeneralComponentsModule } from './general-components/general-components.module';
import { PagesModule } from './pages/pages.module';
import { PrimengModule } from './primeng.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { APP_CONFIG, AppConfig } from './config/app.config';
import { PipesModule } from './pipes/pipes.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PrimengModule,
    GeneralComponentsModule,
    PagesModule,
    HttpClientModule,
    PipesModule,
    NgxSpinnerModule,
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: APP_CONFIG, useValue: AppConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
