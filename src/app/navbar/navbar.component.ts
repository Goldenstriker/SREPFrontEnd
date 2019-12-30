import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService, UserService } from "../_services";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}