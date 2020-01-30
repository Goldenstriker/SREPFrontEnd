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
  predictorForm: FormGroup;
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
    this.predictorForm = this.formBuilder.group({
      No_Of_BedRooms: ["", Validators.required],
      No_Of_LivingRooms: ["", Validators.required],
      No_Of_BathRooms: ["", Validators.required],
      AreaSqFt: ["", Validators.required]
    });
  }
  get f() {
    return this.predictorForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.predictorForm.invalid) {
      return;
    }
    this.loading = true;
    let data = "";
    data += this.predictorForm.value.AreaSqFt + ";";
    data +=
      parseFloat(this.predictorForm.value.No_Of_BedRooms) +
      parseFloat(this.predictorForm.value.No_Of_LivingRooms) +
      ";";
    data += this.predictorForm.value.No_Of_BedRooms + ";";
    data += this.predictorForm.value.No_Of_LivingRooms + ";";
    data += this.predictorForm.value.No_Of_BathRooms;
    this.propertyService
      .predictSalePrice(data)
      .pipe(first())
      .subscribe(
        data => {
          this.pricepredicted = data.;
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
