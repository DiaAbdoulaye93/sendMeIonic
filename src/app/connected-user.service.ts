import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectedUserService {
  private host = environment.host;
  basePath = `${this.host}/api/admin/transactions`;
  constructor(private http: HttpClient , public authService: AuthService) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.host}/api/connected/user`);
  }
  getTransactionsForliste(params): Observable<any> {
    return this.http.get<any>(this.basePath + params);
  }

  getTransactions(): Observable<any> {
    return this.http.get<any>(`${this.host}/api/admin/transactions`);
  }
  getComptes(): Observable<any> {
    return this.http.get<any>(`${this.host}/api/caissier/comptes`);
  }
  getAgences(): Observable<any> {
    return this.http.get<any>(`${this.host}/api/admin/agences`);
  }
  getCommissions(): Observable<any> {
    return this.http.get<any>(`${this.host}/api/commissions`);
  }
}
