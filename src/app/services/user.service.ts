import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'https://reqres.in/';
  private loginUrl = 'api/login';
  private listUrl = 'api/users';
  constructor(private http: HttpClient) { }

  listUsers() {
    return this.http.get('https://reqres.in/api/users');
  }

  userLogin(loginUser: any){
    return this.http.post<any>(this.baseUrl+this.loginUrl, loginUser, httpOptions)
  }

}
