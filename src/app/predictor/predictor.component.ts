import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import {
  AlertService,
  AuthenticationService,
  PropertyService
} from "../_services";
@Component({
  selector: "app-predictor",
  templateUrl: "./predictor.component.html",
  styleUrls: ["./predictor.component.css"]
})
export class PredictorComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  pricepredicted: number;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private propertyService: PropertyService,
    private alertService: AlertService
  ) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      No_Of_BedRooms: ["", Validators.required],
      No_Of_LivingRooms: ["", Validators.required],
      No_Of_BathRooms: ["", Validators.required],
      No_Of_Floors: ["", Validators.required],
      AreaSqFt: ["", Validators.required]
    });
  }
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
    let data = "";
    data += this.registerForm.value.AreaSqFt + ";";
    data +=
      parseFloat(this.registerForm.value.No_Of_BedRooms) +
      parseFloat(this.registerForm.value.No_Of_LivingRooms) +
      ";";
    data += this.registerForm.value.No_Of_BedRooms + ";";
    data += this.registerForm.value.No_Of_LivingRooms + ";";
    data += this.registerForm.value.No_Of_BathRooms;
    this.propertyService
      .predictSalePrice(data)
      .pipe(first())
      .subscribe(
        data => {
          this.pricepredicted = data;
          
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
