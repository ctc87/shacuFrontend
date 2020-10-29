import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QRCodeRoutingModule } from './QRcode-routing.module';
import { NewQrComponent } from './newQr.component';
import { ReadQRComponent } from './readQr.component';
import { LayoutComponent } from './layout.component';
import { ManageQRComponent, DialogContentExampleDialog } from './manageQr.component';
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AppMaterialModule }  from '../app-material/app-material.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppInfoDialogComponent } from '../app-info-dialog/app-info-dialog.component';
import { AppInfoComponent } from '../app-info/app-info.component';

import { FormatsDialogComponent } from '../formats-dialog/formats-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        QRCodeRoutingModule,
        AngularFileUploaderModule,
        ZXingScannerModule,
        FormsModule,
        HttpClientModule,
        AppMaterialModule,
    ],
    declarations: [
        LayoutComponent,
        NewQrComponent,
        ManageQRComponent,
        ReadQRComponent,
        DialogContentExampleDialog,
        FormatsDialogComponent,
        AppInfoComponent, 
        AppInfoDialogComponent
    ],  
    entryComponents:[MatDialogModule, FormatsDialogComponent, AppInfoDialogComponent],


})
export class QRModule { }