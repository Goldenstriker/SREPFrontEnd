import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService, UserService } from "../_services";
import { User } from "../_models";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  currentLoggedInUser: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      if (x) {
        this.currentUser = x;
        this.userService.getCurrentLoggedIn().subscribe(y => {
          this.currentLoggedInUser = y.user;
          console.log(y.user);
        });
      }
    });
  }

  ngOnInit() {}
  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
