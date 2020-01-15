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
  currentLoggedInUser: number;
  properties: Property[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private masterService: MasterService,
    private propertyService: PropertyService
  ) {
    this.userService.currentLoggedInUser.subscribe(x => {
      if (x) {
        this.currentLoggedInUser = x.user__;
      }
    });
  }
  ngOnInit() {
    this.loadAllProperty();
  }
  private loadAllProperty() {
    this.propertyService
      .getPropertyOfUser(this.currentLoggedInUser)
      .subscribe(properties => {
        this.properties = properties;
      });
  }
}
