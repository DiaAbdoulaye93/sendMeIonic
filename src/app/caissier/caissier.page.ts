import { Component, OnInit } from '@angular/core';
import { ConnectedUserService } from '../connected-user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-caissier',
  templateUrl: './caissier.page.html',
  styleUrls: ['./caissier.page.scss'],
})
export class CaissierPage implements OnInit {
  Tokendata: any = '';
  dataSource: any = '';
  prenom = '';
  nom = '';
  constructor(private authservice: AuthService, private dataService: ConnectedUserService) { }

  ngOnInit() {
    this.Tokendata = this.authservice.getData();
    console.log(this.Tokendata);
    this.dataService.getUsers().subscribe(
      (data: any) => {
        this.dataSource = data['hydra:member'];
        this.dataSource.forEach( element => {
         if (element.telephone === this.Tokendata){
             this.nom = element.nom;
             this.prenom = element.prenom;
       }
         });
      },
    );
  }
  logoutProcess() {
    this.authservice.logout();
  }
}
