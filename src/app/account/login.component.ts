import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AlertService, LoginService, DownloadService } from '@app/_services';
import { Observable } from 'rxjs';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    logged = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private loginService: LoginService,
        private downloadService: DownloadService,

    ) {
     }
   
    async getMessages() {
        let data = await this.downloadService.DownloadUserMessages();
        let messages = data['data'];
        return messages;
         
    } 


    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        }); 
        this.route.queryParams.subscribe(async params => {
            let a = await this.loginService.itsLoggedIn();
            console.log("BEFORE IF")
            if( a['logged']) {
                console.log("INSIDEEE IF")
                this.loginService.logged = true;
                this.logged = true;
                this.loginService.getUser();
                // Comprobamos con la cookie que realmente está logueado y noe s una inyección en la parte del frontend
                console.log("LOGUEANDOOO")
                let user = params.hasOwnProperty("user") ? JSON.parse(params['user']) : this.loginService
                if(user.email) {
                    console.log("LOGUEANDOOOasasas")
                    let messages = await this.getMessages();
                    user.messages = messages;
                    console.log("USERRE" , user, messages);
                    this.loginService.setUser(user);
                    let _itsAdmin = await this.loginService.itsAdmin()
                    let itsAdmin = _itsAdmin.hasOwnProperty("its_admin") ? _itsAdmin['its_admin'] : false;
                    this.loginService.its_admin = itsAdmin;
                    this.router.navigate(['/profile'])
                }
            } else {
                this.logged = false;
                this.loginService.logged = false
            }
        });
            

    }

    

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    // login function
    login() {
        window.location.href = "https://192.168.1.58:8080/login";
    }

    // logout function
    logout() {
        window.location.href = "https://192.168.1.58:8080/logout";
    }

    

    openMessages() {
        this.router.navigate(['messages'])
    }



    
    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
/*         this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            }); */
    }
}