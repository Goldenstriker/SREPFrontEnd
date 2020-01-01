import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Country } from "../_models";
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
    this.registerForm = this.formBuilder.group({
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      No_Of_BedRooms: ["", Validators.required],
      No_Of_BathRooms: ["", Validators.required],
      No_Of_Floors: ["", Validators.required],
      Country:["", Validators.required]
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
      console.log(countries);
    });
  }
}
