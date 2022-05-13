
import { ConnectedUserService } from './../connected-user.service';
import { Component, OnInit, ContentChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-simple-agent',
  templateUrl: './simple-agent.page.html',
  styleUrls: ['./simple-agent.page.scss'],
})
export class SimpleAgentPage implements OnInit {
  Tokendata: any = '';
  dataSource: any = '';
  prenom = '';
  nom = '';
  agence = '';
  telephone = '';
  solde: any = '';
  type = 'text';
  isActive = false;
  adminAgence = true;
  simpleAgent = false;
  userRole = '';

  @ContentChild(IonInput) input: IonInput;
  constructor(private authservice: AuthService, private dataService: ConnectedUserService) { }

  ngOnInit() {
    console.log(this.authservice.loggedIn());
    this.authservice.getData().then(res => {
      this.Tokendata = res.username;
      this.userRole = res.roles[0];
      if (this.userRole === 'ROLE_Admin_Agence') {
        this.adminAgence = false;
        this.simpleAgent = true;
      }
      this.dataService.getUsers().subscribe(
        (data: any) => {
          this.dataSource = data['hydra:member'];
          console.log(this.Tokendata.username);
          this.dataSource.forEach(element => {
            if (element.telephone === this.Tokendata.username) {
              this.nom = element.nom;
              this.prenom = element.prenom;
              this.agence = element.agence.nom;
              this.telephone = element.agence.telephone;
              this.solde = element.agence.comptes.solde;
            }
          });
        },
      );
    });
  //  console.log(this.Tokendata);
    // this.userRole = this.authservice.getRole();
  }
  getType() {
    return this.isActive ? 'password' : 'text';
  }

  setType() {
    this.type = this.isActive ? 'password' : 'text';
  }
  logoutProcess() {
    this.authservice.logout();
  }
  teste() {
    alert('oui');
  }
  ionViewWillEnter() {
    if (this.userRole === 'ROLE_Admin_Agence') {
      this.adminAgence = false;
      this.simpleAgent = true;
    }
    this.dataService.getUsers().subscribe(
      (data: any) => {
        this.dataSource = data['hydra:member'];
        this.dataSource.forEach(element => {
          if (element.telephone === this.Tokendata) {
            this.nom = element.nom;
            this.prenom = element.prenom;
            this.agence = element.agence.nom;
            this.telephone = element.agence.telephone;
            this.solde = element.agence.comptes.solde;
          }
        });
      },
    );
  }
}
