import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit{
  isLoading: boolean = true;

  constructor() {}
  
  ngOnInit() {
    this.isLoading = false;
  }
}
