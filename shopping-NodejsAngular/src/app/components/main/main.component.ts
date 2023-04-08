import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  isLoading: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoading = false;
  }

  logout() {
    this.authService.logoutUser();
    this.authService.userDetails(null);
    this.router.navigate(["/"]);
  }
}
