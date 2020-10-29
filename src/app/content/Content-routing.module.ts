import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NewContentComponent } from './newContent.component';
import { ManageContentComponent } from './manageContent.component';
import { SeeContentComponent  } from './seeContent.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: NewContentComponent },
            { path: 'manageContent', component: ManageContentComponent },
            { path: 'qr/:id', component: SeeContentComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentRoutingModule { }