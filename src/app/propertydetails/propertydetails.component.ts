import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import {
  AlertService,
  UserService,
  AuthenticationService,
  PropertyService
} from "../_services";
import { Property } from "../_models";
@Component({
  selector: "app-propertydetails",
  templateUrl: "./propertydetails.component.html",
  styleUrls: ["./propertydetails.component.css"]
})
export class PropertydetailsComponent implements OnInit {
  recordID: string = "";
  property: Property;
  recommendation = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private propertyService: PropertyService
  ) {
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.recordID = params.id;
        this.propertyService.get(params.id).subscribe(property => {
          this.property = property;
        });
      }
    });
  }

  ngOnInit() {}

  private getrecommendation() {
    this.propertyService.getrecommendation().subscribe(data => {
      this.recommendation = data;
    });
  }
}
