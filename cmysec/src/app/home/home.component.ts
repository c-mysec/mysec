import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  connectedCloud : boolean;
  loginOrRegister : boolean;
  constructor() {
    this.connectedCloud = false;
    this.loginOrRegister = true;
  }

  ngOnInit(): void {
  }

}
