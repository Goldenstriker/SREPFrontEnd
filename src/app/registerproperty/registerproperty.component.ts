import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, UserService, AuthenticationService } from '../_services';
@Component({
  selector: 'app-registerproperty',
  templateUrl: './registerproperty.component.html',
  styleUrls: ['./registerproperty.component.css']
})
export class RegisterpropertyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService) { }

  ngOnInit() {
  }

}