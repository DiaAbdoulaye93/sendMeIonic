import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
username: string;
password: string;
  constructor() {}
  login(){
  console.log('username :' + this.username);
  console.log('password: ' +  this.password);
}
}
