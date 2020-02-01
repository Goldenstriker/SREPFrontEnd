import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import {
  AlertService,
  UserService,
  AuthenticationService,
  PropertyService
} from "../_services";
import { Property, } from "../_models";
@Component({
  selector: "app-propertydetails",
  templateUrl: "./propertydetails.component.html",
  styleUrls: ["./propertydetails.component.css"]
})
export class PropertydetailsComponent implements OnInit {
  recordID: string = "";
  property: Property;
  recommendations = [];
  currentLoggedInUser: string = "";
  userprofile: UserProfile;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private propertyService: PropertyService
  ) {
    this.userService.currentLoggedInUser.subscribe(x => {
      if (x) {
        this.currentLoggedInUser = x.user_id;
        this.userprofile = x.userprofile;
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.recordID = params.id;
        this.propertyService.get(params.id).subscribe(property => {
          this.property = property;
          this.getrecommendation(property.Name);
        });
      }
    });
  }

  private getrecommendation(propertyname: string) {
    this.propertyService.getrecommendation(propertyname).subscribe(data => {
      this.recommendations = data;
    });
  }
}
