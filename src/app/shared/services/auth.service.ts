import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  //Only for demo purpose
  authenticated = true;
  private readonly JWT_TOKEN = 'acessToken';
    private readonly REFRESH_TOKEN = 'refreshToken';

  constructor(private store: LocalStoreService, private router: Router , private http: HttpClient) {
    this.checkAuth();
    this.getJwtToken();
  }

  checkAuth() {
    // this.authenticated = this.store.getItem("demo_login_status");
  }

  getuser() {
    return of({});
  }

  signin(credentials) {
    this.authenticated = true;
    this.store.setItem("demo_login_status", true);
    return of({}).pipe(delay(1500));
  }
  signout() {
    this.authenticated = false;
    this.store.setItem("demo_login_status", false);
    localStorage.removeItem('acessToken');
    localStorage.removeItem('permissions');
    localStorage.removeItem('refreshToken');
    this.router.navigateByUrl("/sessions/signin");
  }

  public setToken(token: string) {
    localStorage.setItem(environment.token, token);
    // localStorage.setItem('refreshToken', refreshToken);
}

SetPermission(permissions:any){
  localStorage.setItem('permissions',permissions)
}

hasPermission(permission: string): boolean {
  var permissions = localStorage.getItem('permissions')
  // return permissions != null ? permissions.includes(permission) : false;
  return true;

}

getJwtToken() {
  return localStorage.getItem(this.JWT_TOKEN);
}

refreshToken() {
  return this.http.post<any>(`${environment.API + 'Auth/'}RefreshToken`, {
      'accessToken': this.getJwtToken(),
      'refreshToken': this.getRefreshToken()
  }).pipe(tap((tokens: any) => {
      this.storeJwtToken(tokens.accessToken, tokens.refreshToken);
  }));
}

private storeJwtToken(jwt: string, refreshToken: string) {
  localStorage.setItem(this.JWT_TOKEN, jwt);
  localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
}
private getRefreshToken() {
  return localStorage.getItem(this.REFRESH_TOKEN);
}


}
