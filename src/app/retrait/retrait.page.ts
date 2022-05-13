import { AuthService } from './../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ConnectedUserService } from './../connected-user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  beneficiaire = false;
  emeteur = true;
  InfosShow = true;
  cniEmeteur = '';
  nomEmeteur = '';
  prenomEmeteur = '';
  nomBeneficiaire = '';
  prenomBeneficiaire = '';
  telephoneEmeteur = '';
  telephoneBeneficiaire = '';
  montantTransaction = '';
  formulaire: any = {};
  dataSource: any;
  Tokendata: any;
  idCompte: any = '';

  compte = '/api/caissier/compte/';
  loadcomponent = 'RetraitSegmntOnload';
  cniError = '';
  constructor(private http: HttpClient, private dataService: ConnectedUserService,
              private router: Router, private alertController: AlertController, private authservice: AuthService) { }
              private host = environment.host;
  ngOnInit() {
    this.authservice.getData().then(res => {
      this.Tokendata = res.username;
      console.log(this.Tokendata);
      this.dataService.getUsers().subscribe(
        (data: any) => {
          this.dataSource = data['hydra:member'];
          this.dataSource.forEach(element => {
            if (element.telephone === this.Tokendata) {
              this.idCompte = '{"id":"' + this.compte + element.agence.comptes.id + '"}';
              this.formulaire.comptederetrait = JSON.parse(this.idCompte);
            }
          });
        },
      );
    });
  }
  showEmeteur(): any {
    this.emeteur = false;
    this.beneficiaire = true;
    this.loadcomponent = 'EnvoiesButtonClicked';
  }
  showBeneficiaire(): any {
    this.emeteur = true;
    this.beneficiaire = false;
    this.loadcomponent = 'RetraitSegmntOnload';

  }
  findTransction(event) {
    this.formulaire.cnireceveur = event.target.value;
 //   console.log(this.formulaire.cnireceveur);
    console.log(typeof(this.formulaire.cnireceveur));
    this.dataService.getTransactions().subscribe(

      (data: any) => {
        this.dataSource = data['hydra:member'];
        this.dataSource.forEach(async element => {
          if (this.formulaire.code === element.code && this.formulaire.cnireceveur === element.cnireceveur.toString()) {
            this.cniError = '';
            this.InfosShow = false;
            this.cniEmeteur = element.cni;
            this.nomEmeteur = element.nomemet;
            this.nomBeneficiaire = element.nombenef;
            this.prenomEmeteur = element.prenomemet;
            this.prenomBeneficiaire = element.prenombenef;
            this.telephoneEmeteur = element.telephone;
            this.telephoneBeneficiaire = element.telephonebenef;
            this.montantTransaction = element.montant;
          }
          else{
            this.cniError = 'Verifier le numero du cni du receveur';
          }
          /*  if (element.telephone === this.Tokendata){
                 this.formulaire.compte =  JSON.parse(this.idCompte);
                 this.formulaire.user =  JSON.parse(this.idUser);
          }*/
        });
      },
    );
  }
  insert(transaction: any) {

    this.http.post(`${this.host}/api/transactions`, transaction).subscribe(data => {
      this.transacionComfirme();
      return data;
    },
      err => {
        this.transacionFailed();
      });
  }
  async transacionComfirme(){
    const alert = await this.alertController.create({
      cssClass: 'custom',
      header: 'Operation Reussi',
      message: 'Retrait effectué',
      buttons: ['OK']
    });
    await alert.present();
  }
  async transacionCancel(){
    const alert = await this.alertController.create({
      cssClass: 'custom',
      header: 'retrait annulé',
      message: 'Ce retrait a été annulé',
      buttons: ['OK']
    });
    await alert.present();
  }
  async transacionFailed(){
    const alert = await this.alertController.create({
      cssClass: 'custom',
      header: 'operation echec',
      message: 'Erreur de retrait',
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation du transfert',
      message: ' Emetteur: <span class= "filiations">' + this.prenomEmeteur + ' '
        + this.nomEmeteur + '</span><br/><br/>Telephone: <span class= "filiations">' +
        this.telephoneEmeteur + '</span><br/><br/> N° Cni: <span class= "filiations">' + this.cniEmeteur +
        '</span><br/><br/> Montant a envoyer: <span class= "filiations">' + this.montantTransaction +
        '</span><br/><br/> Beneficiaire: <span class= "filiations">' + this.prenomBeneficiaire + ' '
        + this.nomBeneficiaire + '</span><br/><br/> Telephone: <span class= "filiations">'
        + this.telephoneBeneficiaire + '</span>',
      cssClass: 'custom',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
          this.transacionCancel();
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.AddTransaction();
          }
        }
      ]
    });
    return await alert.present();

  }
  AddTransaction() {
    console.log(this.formulaire);
    this.insert(this.formulaire);
  }
  homebutton() {
    this.router.navigate(['/agence-users']);
  }
}
