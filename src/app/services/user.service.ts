import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl :string = "https://localhost:7180";

  constructor(public http: HttpClient) {
  }

  login(post: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/authenticate/login`, post);
  }
}
