import { ConnectedUserService } from './../connected-user.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-agence',
  templateUrl: './admin-agence.page.html',
  styleUrls: ['./admin-agence.page.scss'],
})
export class AdminAgencePage implements OnInit {
  Tokendata: any = '';
  dataSource: any = '';
  prenom = '';
  nom = '';
  agence = '';
  telephone = '';
  solde: any = '';
  type = 'text';
  isActive = false;
  constructor(private authservice: AuthService, private dataService: ConnectedUserService) { }

  ngOnInit() {
    this.authservice.getData().then(res => {
      this.Tokendata = res.username;
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
    );
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
}
