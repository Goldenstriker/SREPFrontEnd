import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService, UserService } from "./_services";
import { User } from "./_models";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})
export class ContentComponent implements OnInit {
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
}
