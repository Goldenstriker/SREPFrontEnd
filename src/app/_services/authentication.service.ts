import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserService } from "../_services";
import { User } from "../_models";
import { Constant } from "../constants";
@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentLoggedInUserSubject: BehaviorSubject<any>;
  public currentLoggedInUser: Observable<any>;
  public currentUser: Observable<User>;
  private httpOptions: any;

  constructor(private http: HttpClient, private userService: UserService) {
    this.httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "x-www-form-urlencoded" })
    };
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentLoggedInUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentloggedinuser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentLoggedInUser = this.currentLoggedInUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  public get currentLoggedInValue(): any {
    return this.currentLoggedInUserSubject.value;
  }
  login(username: string, password: string) {
    return this.http
      .post<any>(Constant.AuthenticationURL, { username, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.userService.getCurrentLoggedIn().subscribe((y: any) => {
              localStorage.setItem("currentloggedinuser", JSON.stringify(y));
              this.currentLoggedInUserSubject.next(y);
            });
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
