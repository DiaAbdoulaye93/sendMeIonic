import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-agence',
  templateUrl: './creer-agence.page.html',
  styleUrls: ['./creer-agence.page.scss'],
})
export class CreerAgencePage implements OnInit {
  agence = false;
  utilisateur = true;
  userData: any = {};
  userArray: string[] = [];
  compteArray: string[] = [];
  compteData: any = {};
  postedData: any = '';
  formulaire: any = {};
  profil = {id: 'api/admin/profils/3'};
  user2 =  {id: '/api/admin/user/10'};
  constructor(private  http: HttpClient, private router: Router) { }

  ngOnInit() {

  }
  showAgence(): any {
    this.agence = false;
    this.utilisateur = true;
  }
  showUser(): any {
    this.agence = true;
    this.utilisateur = false;

  }

  insert(agence: any) {
    this.http.post('https://127.0.0.1:8000/api/admin/agences', agence).subscribe(data => {
    Swal.fire({
        position: 'center',
             icon: 'success',
             title: 'Transfert successfull :)',
             html: 'Vous venez de creer une nouvelle agence',
             showClass: {
               popup: 'animate__animated animate__fadeInDown'
             },
             hideClass: {
               popup: 'animate__animated animate__fadeOutUp'
             }
              });
    },
      err => {
       Swal.fire({
          icon: 'error',
          title: 'Echec du transfert veuillez verifier votre saisie ',
           });
      });
  }

  CreateAgence(): any {
       this.userData.profil = this.profil;
     //  this.userArray.push(this.user2);
       this.userArray.push(this.userData);
       this.formulaire.users = this.userArray;
       this.formulaire.comptes = this.compteData;
       console.log(this.formulaire);
       this.insert( this.formulaire);
  }
  homebutton(){
    this.router.navigate([ '/admin-systeme']);
   }
}
