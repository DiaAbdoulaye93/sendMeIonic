import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ConnectedUserService } from '../connected-user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-depot-compte',
  templateUrl: './depot-compte.page.html',
  styleUrls: ['./depot-compte.page.scss'],
})
export class DepotComptePage implements OnInit {

  formulaire: any = {};
  numCompteInput: any = {};
  Tokendata: any = '';
  dataSource: any = '';
  InfosShow = true;
  prenom = '';
  nom = '';
  idCompte: number;
  nuemrocompte = '';
  agence = '';
  telephone = '';
  adresse = '';
  soldeEncours = '';
  constructor(private http: HttpClient, private authservice: AuthService, private router: Router,
              private dataService: ConnectedUserService, private alertController: AlertController) { }

  ngOnInit() {
    this.Tokendata = this.authservice.getData();
    console.log(this.Tokendata);
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
  }
  findCompte(event) {
    // tslint:disable-next-line:radix
    this.numCompteInput.numCompte = event.target.value;

    this.dataService.getComptes().subscribe(
      (data: any) => {
        this.dataSource = data['hydra:member'];
        this.dataSource.forEach(element => {
          if (this.numCompteInput.numCompte === element.numero) {
            this.InfosShow = false;
            console.log(element);
            this.idCompte = element.id;
            this.nuemrocompte = element.numero;
            this.agence = element.agence.nom;
            this.telephone = element.agence.telephone;
            this.adresse = element.agence.adresse;
            this.soldeEncours = element.solde;
            /*  if (element.telephone === this.Tokendata){
                   this.formulaire.compte =  JSON.parse(this.idCompte);
                   this.formulaire.user =  JSON.parse(this.idUser);
            }*/
          }
        });
      },
    );
  }
  Update(formulaire: any) {
    this.http.put( `https://127.0.0.1:8000/api/caissier/compte/${this.idCompte}`, formulaire).subscribe(data => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Depot effectué',
        showConfirmButton: false,
        timer: 2000
      });
      return data;
    },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Echec du depot ',
        });
      });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation du depot',
      message: ' Depositaire: <span class= "filiations">' + this.prenom + ' '
        + this.nom + ' caissier du siege</span><br/><br/>Compte: <span class= "filiations">' +
        this.nuemrocompte + '</span><br/><br/>Agence: <span class= "filiations">' + this.agence +
        '</span><br/><br/> Telephone <span class= "filiations">' + this.telephone +
        '</span><br/><br/> Adresse: <span class= "filiations">' + this.adresse +
        '</span><br/><br/> Somme: <span class= "filiations">'
        + this.formulaire.solde + ' francs cfa</span>',
      cssClass: 'custom',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            Swal.fire({
              title: 'Le depot a été annulé merci :) ',
            });
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.UpdateCompte();
          }
        }
      ]
    });
    return await alert.present();

  }
  UpdateCompte() {
    console.log(this.formulaire);
    this.Update( this.formulaire);
  }
  homebutton(){
    this.router.navigate([ '/caissier']);
   }
}
