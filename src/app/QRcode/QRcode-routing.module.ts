import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewQrComponent } from './newQr.component';
import { ManageQRComponent } from './manageQr.component';
import { ReadQRComponent } from './readQr.component';
import { LayoutComponent } from './layout.component';

import { AuthGuard, AdminGuard } from '../_helpers';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: NewQrComponent , canActivate:[AdminGuard]},
            { path: 'manageQR', component: ManageQRComponent, canActivate:[AdminGuard] },
            { path: 'readQR', component: ReadQRComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QRCodeRoutingModule { }