import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsComponent } from './maps';
import { ProfileComponent } from './profile';
import { MessagesComponent } from './messagges';
import { AuthGuard, AdminGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const QRmodule = () => import('./QRcode/QRcode.module').then(x => x.QRModule);
const Contentmodule = () => import('./content/Content.module').then(x => x.ContentModule);

const routes: Routes = [
    { path: '',  loadChildren: accountModule },
    { path: 'QR', loadChildren: QRmodule, canActivate: [AuthGuard] },
    { path: 'Content', loadChildren: Contentmodule, /* canActivate: [AuthGuard] */ },
    { path: 'maps', component: MapsComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }