import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";

import { User, Country } from "../_models";
import {
  UserService,
  AuthenticationService,
  MasterService
} from "../_services";

@Component({ templateUrl: "home.component.html" })
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  countries: Country[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private masterService: MasterService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit() {
    this.loadAllUsers();
    this.loadAllCountry();
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
}
