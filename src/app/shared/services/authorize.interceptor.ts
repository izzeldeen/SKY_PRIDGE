import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeInterceptor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    constructor(
        private authorize: AuthService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private translateService: TranslateService,
        private router: Router) { }

    addToken(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + localStorage.getItem('acessToken') } })
    }
    addAcceptLanguage(req: HttpRequest<any>): HttpRequest<any> {
        return req.clone({ setHeaders: { 'Accept-Language': localStorage.getItem("language") ?? 'en' } })
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authorize.getJwtToken()) {
            request = this.addToken(request, this.authorize.getJwtToken());
        }
        request = this.addAcceptLanguage(request);

        if(!request.url?.includes('ProductWeighting/Connect') && !request.url.includes('WasteWeighing/Connect')){
            this.spinner.show()
        }

        return next.handle(request).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    this.spinner.hide();
                }
            }),
            catchError((error) => {
                this.spinner.hide();

                if (error.status === 401) {
                    this.toastr.error('Unauthorized');
                    this.router.navigate(['/sessions/signin'])
                } else {
                    const message = error.error && typeof error.error === 'string'
                        ? error.error
                        : error.error?.title;

                    this.toastr.error(
                        message ? this.translateService.instant('errors.' + message) : this.translateService.instant('errors.unknownError')
                    );
                }

                return throwError(() => new Error(error.message));
            })
        );
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);
            return this.authorize.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshingToken = false;
                    this.tokenSubject.next(token.jwt);
                    return next.handle(this.addToken(req, token.jwt));
                }));

        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(req, jwt));
                }));
        }
    }

    /*
      This method is only here so the example works.
      Do not include in your code, just use 'req' instead of 'this.getNewRequest(req)'.
    */


    logoutUser() {
        // Route to the login page (implementation up to you)
        this.authorize.signout();
        return throwError("");
    }



}
