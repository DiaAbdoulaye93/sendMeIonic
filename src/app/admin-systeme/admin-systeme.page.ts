import { ConnectedUserService } from './../connected-user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-systeme',
  templateUrl: './admin-systeme.page.html',
  styleUrls: ['./admin-systeme.page.scss'],
})
export class AdminSystemePage implements OnInit {
  Tokendata: any = '';
  dataSource: any = '';
  prenom = '';
  nom = '';
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
            }
          });
        },
      );
    });
  }
  logoutProcess() {
    this.authservice.logout();
  }
}
