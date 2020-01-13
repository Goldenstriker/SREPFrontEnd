import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import {
  User,
  Country,
  Property,
  State,
  City,
  PropertyType,
  PropertyStatus
} from "../_models";
import {
  UserService,
  AuthenticationService,
  MasterService,
  PropertyService
} from "../_services";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private masterService: MasterService,
    private propertyService: PropertyService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
    this.userService.getCurrentLoggedIn().subscribe((y: any) => {
      this.currentLoggedInUser = y.user_id;
    });
  }

  ngOnInit() {}
}
