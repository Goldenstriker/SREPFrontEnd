import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User, UserProfile } from "../_models";
import { Constant } from "../constants";

@Injectable({ providedIn: "root" })
export class UserService {
  private currentLoggedInUserSubject: BehaviorSubject<any>;
  public currentLoggedInUser: Observable<any>;
  constructor(private http: HttpClient) {
    this.currentLoggedInUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentloggedinuser"))
    );
    this.currentLoggedInUser = this.currentLoggedInUserSubject.asObservable();
  }
  public get currentLoggedInValue(): any {
    return this.currentLoggedInUserSubject.value;
  }
  public baseURL: string = Constant.SiteURL;
  getAll() {
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
    return this.http.get<any>(this.baseURL + `/current_user/`).pipe(
      map(user => {
        if (user && user.user_id) {
          localStorage.setItem("currentloggedinuser", JSON.stringify(user));
          this.currentLoggedInUserSubject.next(user);
        }
        return user;
      })
    );
  }
  getAllUserProfile() {
    return this.http.get<UserProfile[]>(this.baseURL + `/userprofile/`);
  }
}
