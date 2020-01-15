import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

@Component({ templateUrl: "home.component.html" })
export class HomeComponent implements OnInit, OnDestroy {
  loading = false;
  submitted = false;
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  countries: Country[] = [];
  properties: Property[] = [];
  states: State[] = [];
  cities: City[] = [];
  propertystatus: PropertyStatus[] = [];
  propertytype: PropertyType[] = [];
  searchText: string = JSON.stringify({
    Country: [],
    State: [],
    City: [],
    Property_Type: [],
    Property_Status: []
  });
  tempData: any = {};
  currentLoggedInUser: string = "";
  searchform: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
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
    this.userService.currentLoggedInUser.subscribe(x=>{
      if(x){
        this.currentLoggedInUser = x.user_;
      }
    });
  }

  ngOnInit() {
    //this.loadAllUsers();
    this.loadAllCountry();
    this.loadAllState();
    this.loadAllCity();
    this.loadPropertyStatus();
    this.loadPropertyType();
    this.loadAllProperty();
    this.searchform = this.formBuilder.group({
      search: ["", Validators.required]
    });
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
  private loadAllState() {
    this.masterService.getAllStateByCountry().subscribe(states => {
      this.states = states;
    });
  }
  private loadAllCity() {
    this.masterService.getAllCityByState().subscribe(cities => {
      this.cities = cities;
    });
  }
  private loadPropertyStatus() {
    this.masterService.getPropertyStatus().subscribe(propertystatus => {
      this.propertystatus = propertystatus;
      console.log(propertystatus);
    });
  }
  private loadPropertyType() {
    this.masterService.getPropertyType().subscribe(propertytype => {
      this.propertytype = propertytype;
      console.log(propertytype);
    });
  }
  toggleVisibility(e, data, prop) {
    this.tempData = JSON.parse(this.searchText);
    if (this.tempData[prop].indexOf(data) == -1 && e.srcElement.checked)
      this.tempData[prop].push(data);
    else this.tempData[prop].pop(data);
    this.searchText = JSON.stringify(this.tempData);
  }
  get f() {
    return this.searchform.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.searchform.value);
    // stop here if form is invalid
    if (this.searchform.invalid) {
      return;
    }
    this.loading = true;
    this.propertyService
      .search(this.searchform.value.search)
      .pipe()
      .subscribe(
        (data: Property[]) => {
          this.properties = data;
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
  }
}
