import { TransfertService } from './../transfert.service';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ConnectedUserService } from '../connected-user.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.page.html',
  styleUrls: ['./transfert.page.scss'],
})
export class TransfertPage implements OnInit {

  beneficiaire = true;
  emeteur = false;
  TransfertFrais = 0;
  TransfertTotal = 0;
  frais;
  total;
  Tokendata: any;
  dataSource: any;
  idCompte: any = '';
  idUser: any = '';
  user = '/api/admin/user/';
  compte = '/api/caissier/compte/';
  loadcomponent = 'RetraitSegmntOnload';
  EnvoieForm: {};
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private dataService: ConnectedUserService, private router: Router, private fb: FormBuilder,
              private location: Location, private transfertService: TransfertService,
              private authservice: AuthService, private alertController: AlertController) { }
  formulaire = this.fb.group({
    cni: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)
               , Validators.pattern('^(1|2)[0-9]{12}$')]],
    nomemet: ['', [Validators.required, Validators.minLength(2)]],
    prenomemet: ['', [Validators.required, Validators.minLength(3)]],
    telephone: ['', [ Validators.required, Validators.minLength(9),
                      Validators.maxLength(9), Validators.pattern('^(70|75|76|77|78)([0-9]{7}$)')]],
    montant: ['', [Validators.required]],
    cnireceveur: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)
                    , Validators.pattern('^(1|2)[0-9]{12}$')]],
    nombenef: ['', [Validators.required, Validators.minLength(2)]],
    prenombenef: ['', [Validators.required, Validators.minLength(3)]],
    telephonebenef: ['', [ Validators.required, Validators.minLength(9),
                     Validators.maxLength(9), Validators.pattern('^(70|75|76|77|78)([0-9]{7}$)')]],
    compte: [''],
    user: [''],
  });
  ngOnInit() {
    this.authservice.getData().then(res => {
      this.Tokendata = res.username;
      this.dataService.getUsers().subscribe(
        (data: any) => {
          this.dataSource = data['hydra:member'];
          this.dataSource.forEach(element => {
            if (element.telephone === this.Tokendata) {
              this.idCompte = '{"id":"' + this.compte + element.agence.comptes.id + '"}';
              this.idUser = '{"id":"' + this.user + element.id + '"}';
              this.formulaire.value.compte = JSON.parse(this.idCompte);
              this.formulaire.value.user = JSON.parse(this.idUser);
            }
          });
        },
      );
    });
  }
  showEmeteur(): any {
    this.emeteur = false;
    this.beneficiaire = true;
    this.loadcomponent = 'RetraitSegmntOnload';
  }
  showBeneficiaire(): any {
    this.emeteur = true;
    this.beneficiaire = false;
    this.loadcomponent = 'EnvoiesButtonClicked';
  }

  montantInput(event) {
    // tslint:disable-next-line:radix
    const montant = parseInt(event.target.value);
    // tslint:disable-next-line:radix
    this.frais =  montant ? (montant) / 100 : 0;
    // this.formulaire.value.frais = frais;
    this.total = (montant ? (montant) / 100 : 0) + montant;
   //const total = this.formulaire.value.total;

  }
  async transacionCancel(){
    const alert = await this.alertController.create({
      cssClass: 'custom',
      header: 'Transfert annulé',
      message: 'Ce transfert a été annulé',
      buttons: ['OK']
    });
    await alert.present();
  }
 
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation du transfert',
      message: ' Emetteur: <span class= "filiations">' + this.formulaire.value.prenomemet + ' '
        + this.formulaire.value.nomemet + '</span><br/><br/>Telephone: <span class= "filiations">' +
        this.formulaire.value.telephone + '</span><br/><br/> N° Cni: <span class= "filiations">' + this.formulaire.value.cni +
        '</span><br/><br/> Montant a envoyer: <span class= "filiations">' + this.formulaire.value.montant +
        '</span><br/><br/> Beneficiaire: <span class= "filiations">' + this.formulaire.value.prenombenef + ' '
        + this.formulaire.value.nombenef + '</span><br/><br/> Telephone: <span class= "filiations">'
        + this.formulaire.value.telephonebenef + '</span>',
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
    this.EnvoieForm = {
      cni : this.formulaire.value.cni,
      nomemet : this.formulaire.value.nomemet,
      prenomemet : this.formulaire.value.prenomemet,
      telephone: this.formulaire.value.telephone,
      montant: this.formulaire.value.montant,
      frais: this.frais,
      total: this.total,
      cnireceveur: this.formulaire.value.cnireceveur,
      nombenef: this.formulaire.value.nombenef,
      prenombenef: this.formulaire.value.prenombenef,
      telephonebenef: this.formulaire.value.telephonebenef,
      user:  JSON.parse(this.idUser),
      compte:  JSON.parse(this.idCompte)
    };
    console.log(this.EnvoieForm);
    this.transfertService.insert( this.EnvoieForm);
  }
  homebutton() {
    this.router.navigate(['/agence-users']);
  }

}
