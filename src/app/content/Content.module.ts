import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './Content-routing.module';
import { NewContentComponent } from './newContent.component';
import { LayoutComponent } from './layout.component';
import { ManageContentComponent } from './manageContent.component';
import { SeeContentComponent } from './seeContent.component';
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AppMaterialModule }  from '../app-material/app-material.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ContentRoutingModule,
        AngularFileUploaderModule,
        FormsModule,
        HttpClientModule,
        AppMaterialModule,
    ],
    declarations: [
        LayoutComponent,
        NewContentComponent,
        ManageContentComponent,
        SeeContentComponent,
    ],  
    entryComponents:[MatDialogModule],


})
export class ContentModule { }