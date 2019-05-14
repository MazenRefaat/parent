import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'https://reqres.in/';
  private loginUrl = 'api/login';
  private usersUrl = 'api/users';
  constructor(private http: HttpClient) {}

  // Service Function to list Users
  listUsers(): Observable < any > {
    return this.http.get(this.baseUrl + this.usersUrl);
  }

  // Service Function to get One User 
  getUser(id) {
    return this.http.get <any> (this.baseUrl + this.usersUrl + '/' + id);
  }
  // Service Function to Login
  userLogin(loginUser: any) {
    return this.http.post <any> (this.baseUrl + this.loginUrl, loginUser, httpOptions)
  }

  // Service Function to Delete User
  deleteUser(user: any) {
    return this.http.delete <any> (this.baseUrl + this.usersUrl + '/' + user.id);
  }

  // Service Function to Edit User
  editUser(id: number, user: any) {
    return this.http.put <any> (this.baseUrl + this.usersUrl + '/' + id, user);
  }

  // Service Function to Create User
  createUser(user: any) {
    console.log('user', user)
    if (user.first_name == "" || user.last_name == "") {
      throw (new Error('Info Missing, please check'));
    } else {
      return this.http.post <any> (this.baseUrl + this.usersUrl, user);
    }
  }
}
