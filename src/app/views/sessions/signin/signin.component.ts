import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: UntypedFormGroup;
    constructor(
        private fb: UntypedFormBuilder,
        private auth: AuthService,
        private baseService : BaseService,
        private router: Router,
        private afAuth: AngularFireAuth,
          private translate: TranslateService,
            private toastr: ToastrService,
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    
    triggerShowPass(e) {
		if (!e.target.classList.contains('show')) {
			e.target.classList.add('show');
			e.target.nextElementSibling.type = 'text';
		} else {
			e.target.classList.remove('show');
			e.target.nextElementSibling.type = 'password';
		}
	}
    signin() {
      debugger;
        this.loading = true;
                             this.loadingText = 'Sigining in...';
                            this.afAuth.signInWithEmailAndPassword(
                       this.signinForm.value.userName,
                       this.signinForm.value.password
                     ).then(cred => {
                       // cred is UserCredential
                       cred.user?.getIdToken().then(token => {
                         console.log("JWT Token:", token);
                         // save token in localStorage/sessionStorage
                        this.auth.setToken((token as any).accessToken)
                           this.auth.authenticated = true
                           this.router.navigateByUrl('/dashboard/v1');
                           this.loading = false;
                       });
                     }).catch(error => {
                         this.toastr.error(
                                    this.translate.instant('error'),
                                    this.translate.instant('UserName or Password InValid'),
                                 { timeOut: 3000 })
                     });
      }

    getUserPermission(){
        this.baseService.Get('Permissions','GetRolesPermissions').subscribe(res =>{
          this.auth.SetPermission(res as any[])
        })
      }

}
