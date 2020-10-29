import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from "@angular/material/dialog";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {  MatSidenavModule } from  '@angular/material/sidenav';


import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    MatSliderModule,
    MatToolbarModule,  
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSidenavModule,
    SlickCarouselModule,
    ],
  exports: [
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    MatSliderModule,
    MatToolbarModule,  
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSidenavModule,
    SlickCarouselModule
  ]
})
export class AppMaterialModule { }
