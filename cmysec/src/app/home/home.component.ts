import { Component, OnInit } from '@angular/core';
import { LocaldataService } from '../services/localdata.service'
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
    this.loginOrRegister = false;
  }

  ngOnInit(): void {
  }

}
