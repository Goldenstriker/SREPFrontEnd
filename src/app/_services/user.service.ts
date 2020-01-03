import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../_models";
import { Constant } from "../constants";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}
  public baseURL: string = Constant.SiteURL;
  getAll() {
    console.log(Constant.SiteURL);
    return this.http.get<User[]>(this.baseURL + `/users/`);
  }

  register(user: User) {
    console.log(Constant.SiteURL);
    return this.http.post(this.baseURL + `/register/`, user);
  }

  delete(id: number) {
    return this.http.delete(this.baseURL + `/users/${id}`);
  }

  getCurrentLoggedIn() {
    return this.http.get<any>(this.baseURL + `/current_user/`);
  }
}
