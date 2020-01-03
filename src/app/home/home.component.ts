import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";

import { User, Country, Property } from "../_models";
import {
  UserService,
  AuthenticationService,
  MasterService,
  PropertyService
} from "../_services";

@Component({ templateUrl: "home.component.html" })
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  countries: Country[] = [];
  properties: Property[] = [];
  searchText:string;
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
  }

  ngOnInit() {
    //this.loadAllUsers();
    this.loadAllCountry();
    this.loadAllProperty()
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.loadAllUsers();
      });
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }

  private loadAllCountry() {
    this.masterService.getAllCountry().subscribe(countries => {
      this.countries = countries;
      console.log(countries);
    });
  }
  //propertyService
  private loadAllProperty() {
    this.propertyService.getAll().subscribe(properties => {
      this.properties = properties;
    });
  }

  toggleVisibility(e){
    this.searchText= "Test Property 1";
  }
}
