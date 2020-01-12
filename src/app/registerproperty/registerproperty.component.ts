import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import {
  Country,
  State,
  City,
  PropertyType,
  PropertyStatus,
  PropertyPurpose
} from "../_models";
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
  propertystatus: PropertyStatus[] = [];
  propertytype: PropertyType[] = [];
  propertypurpose: PropertyPurpose[] = [];
  isEditForm: boolean = false;
  recordID: string = "";
  currentLoggedInUser: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    this.userService.getCurrentLoggedIn().subscribe((y: any) => {
      this.currentLoggedInUser = y.user_id;
    });
  }

  ngOnInit() {
    this.loadAllCountry();
    this.loadAllState();
    this.loadAllCity();
    this.loadPropertyStatus();
    this.loadPropertyType();
    this.loadPropertyPurpose();
    this.registerForm = this.formBuilder.group({
      ID: [""],
      Name: ["", Validators.required],
      Description: ["", Validators.required],
      No_Of_BedRooms: ["", Validators.required],
      No_Of_LivingRooms: ["", Validators.required],
      No_Of_BathRooms: ["", Validators.required],
      No_Of_Floors: ["", Validators.required],
      Country: ["", Validators.required],
      State: ["", Validators.required],
      City: ["", Validators.required],
      Property_Status: ["", Validators.required],
      Property_Purpose: ["", Validators.required],
      Address: ["", Validators.required],
      Price: ["", Validators.required],
      AreaSqFt: ["", Validators.required],
      Property_Type: ["", Validators.required],
      UserCreatedBy: [""],
      UserCreatedDate: [""]
    });
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.recordID = params.id;
        this.propertyService.get(params.id).subscribe(property => {
          this.registerForm.setValue(property);
          this.isEditForm = true;
        });
      }
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
    if (this.isEditForm) {
      //recordID
      this.propertyService
        .update(this.registerForm.value, this.recordID)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Record updated", true);
            this.router.navigate(["/home"]);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
    } else {
      let property = this.registerForm.value;
      property.UserCreatedBy = this.currentLoggedInUser;
      property.UserCreatedDate = new Date().toISOString().slice(0, 10);
      this.propertyService
        .register(property)
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
  private loadPropertyStatus() {
    this.masterService.getPropertyStatus().subscribe(propertystatus => {
      this.propertystatus = propertystatus;
      console.log(propertystatus);
    });
  }
  private loadPropertyType() {
    this.masterService.getPropertyType().subscribe(propertytype => {
      this.propertytype = propertytype;
    });
  }
  private loadPropertyPurpose() {
    this.masterService.getPropertyPurpose().subscribe(propertypurpose => {
      this.propertypurpose = propertypurpose;
    });
  }
}
