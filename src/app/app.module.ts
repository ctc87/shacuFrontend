import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {BrowserAnimationsModule} from  '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';






// used to create fake backend
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent, Header } from './_components';
import { MapsComponent, DialogContentDetail } from './maps';
import { ProfileComponent } from './profile';
import { MessagesComponent, DialogSeeMessage } from './messagges';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction


@NgModule({
    imports: [
        BrowserModule,
        
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        AppMaterialModule,

        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyALRka2IF9lWPiVU9DULJ3pHDS4ifWdjYo'
        }),
        AgmDirectionModule,
        ],
    declarations: [
        AppComponent,
        Header,
        AlertComponent,
        MapsComponent,
        DialogContentDetail,
        ProfileComponent,
        MessagesComponent,
        DialogSeeMessage,
    ],
    providers: [
  
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };