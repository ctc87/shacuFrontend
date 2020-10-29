import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({ 

    templateUrl: 'profile.component.html',
    styleUrls: ['./profile.component.scss']

})
export class ProfileComponent  {

    constructor(private router : Router) {

    }

    newQRcode() {
        this.router.navigate(['QR'])
    }

    manageQRcode() {
        this.router.navigate(['QR/manageQR'])
    }

    newContent() {
        this.router.navigate(['Content'])
    }

    manageContent() {
        this.router.navigate(['Content/manageContent'])
    }

}


