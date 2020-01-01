import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Country, State, City } from "../_models";
import {
  AlertService,
  UserService,
  AuthenticationService,
  PropertyService,
  MasterService
} from "../_services";
@Component({
  selector: "app-registerproperty",
  templateUrl: "./registerproperty.component.html",
  styleUrls: ["./registerproperty.component.css"]
})
export class RegisterpropertyComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private propertyService: PropertyService,
    private masterService: MasterService
  ) {
    // redirect to home if already logged in
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loadAllCountry();
    this.loadAllState();
    this.loadAllCity();
    this.registerForm = this.formBuilder.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      No_Of_BedRooms: ["", Validators.required],
      No_Of_BathRooms: ["", Validators.required],
      No_Of_Floors: ["", Validators.required],
      Country:["", Validators.required],
      State:["", Validators.required],
      City:["", Validators.required],
      Property_Status:["", Validators.required],
      Property_Type:["", Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.propertyService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Registration successful", true);
          this.router.navigate(["/home"]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
   private loadAllCountry() {
    this.masterService.getAllCountry().subscribe(countries => {
      this.countries = countries;
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
}
