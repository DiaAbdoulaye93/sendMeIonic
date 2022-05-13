import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
  data: any = '';
  telephone: any = '';
  role: any = '';
  constructor(private http: HttpClient, private router: Router, private storage: Storage) { }
  private host = environment.host;
  public loginUrl = `${this.host}/api/login_check`;
  public registerUrl = 'api/admin/user';
  //public baseUrl = 'https://localhost:8000/api';
  // public this.storage  = window.this.storage;

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user);
  }

  registerUser(user: any): any {
    return this.http.post<any>(this.registerUrl, user);
  }
  loggedIn() {
    return this.storage.get('token');
  }
  // On renvoie le token a l'intercepteur
  getToken() {
    return this.storage.get('token');
  }
  // tslint:disable-next-line:typedef

  posteToken(credentials: any) {
    this.loginUser(credentials).subscribe(
      (token: any) => {
        if (token.token !== '') {
          return this.storage.set('token', token.token);
          //console.log(this.storage.set('token', token.token));

        }
      },
      (httpError: any) => console.log(httpError.error.message),
    );
  }
  decodeToken() {
    // return this.storage.get('token') ? this.storage.get('token').then(res => jwt_decode(res)) : null;
    return this.storage.get('token').then(res => jwt_decode(res));
  }

  logout(): any {
    this.storage.clear();
    this.router.navigate(['/']);

  }
  getData(): any {
    this.data = this.getToken().then(res => jwt_decode(res));
    this.data.then(res => {
      this.telephone = res;
      //console.log(this.telephone.username);
    });
    return this.data;
}
getRole(): any{
  this.decodeToken().then(res => {
    this.data = res;
  });
  this.role = this.data.roles[0];
  return this.role;
}
// tslint:disable-next-line:typedef
redirectByRole(role: string) {
  switch (role) {
    case 'ROLE_Admin_system': {
      this.router.navigate(['admin-systeme']);
      break;
    }
    case 'ROLE_Caissier': {
      this.router.navigate(['caissier']);
      break;
    }
    case 'ROLE_Admin_Agence': {
      this.router.navigate(['agence-users']);
      break;
    } case 'ROLE_Simple_agent': {
      this.router.navigate(['agence-users']);
      break;
    }
    default: {
      this.router.navigate(['/']);
      break;
    }
  }
}
}
