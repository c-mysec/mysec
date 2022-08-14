import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  /*
  Node Name
ESP32
Node User Name
admin
Node User Password
12345678
Iot Name
clovis harada
Iot Password
lockheed
Iot endpoint

Iot out topic
  */

  configForm = this.formBuilder.group({
    nodeName: '',
    userName: '',
    password: '',
    iotName: '',
    iotPassword: '',
    iotEndpoint: '',
    iotTopic: '',
    email: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    console.warn('Your order has been submitted', this.configForm.value);
    this.configForm.reset();
  }
  reset(): void {
    console.warn('reset', this.configForm.value);
    this.configForm.reset();
  }
}
