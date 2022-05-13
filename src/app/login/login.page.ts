import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: any = {};
  fetchedData;
  roleUser;
  userType: any;
  nom: any = '';
  prenom: any = '';
  constructor(private authservice: AuthService, private router: Router, private fb: FormBuilder) { }
  formulaire = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(9)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]]
  });
  ngOnInit() {
  }
  login() {
    // console.log(this.formulaire.value);
    this.authservice.posteToken(this.formulaire.value);
    console.log(this.authservice.posteToken(this.formulaire.value));
    //console.log(this.authservice.posteToken(this.credentials));
    this.authservice.decodeToken().then(res => {
      this.userType = res;
      this.roleUser = this.userType.roles[0];
      if (this.roleUser === 'ROLE_Simple_agent' || this.roleUser === 'ROLE_Admin_Agence' ){
        this.router.navigate(['agence-users']);
      }
      else if ( this.roleUser === 'ROLE_Admin_system'){
        this.router.navigate(['admin-systeme']);
      }
      else if ( this.roleUser === 'ROLE_Caissier'){
        this.router.navigate(['caissier']);
      }
    },
    );
   // this.authservice.redirectByRole(this.roleUser);
  }

}
