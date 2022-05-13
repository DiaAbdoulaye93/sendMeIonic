import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ConnectedUserService } from '../connected-user.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-calculateur-frais',
  templateUrl: './calculateur-frais.page.html',
  styleUrls: ['./calculateur-frais.page.scss'],
})

export class CalculateurFraisPage implements OnInit {
  formulaire: any = {};
  montant: any = '';
  frais = 0;
  constructor(private router: Router, private alertCtrl: AlertController, private authservice: AuthService) { }
  async presentAlert() {
    if (this.formulaire)
    {
      this.montant = this.formulaire.montant;
      if (this.montant > 0 && 5000 > this.montant) {
        this.frais = 425;
      }
      if (this.montant >= 5000 && 10000 > this.montant) {
        this.frais = 850;
      }
      if (this.montant >= 10000 && 15000 > this.montant) {
        this.frais = 1270;
      }
      if (this.montant >= 15000 && 20000 > this.montant) {
        this.frais = 1695;
      }
      if (this.montant >= 20000 && 50000 > this.montant) {
        this.frais = 2500;
      }
      if (this.montant >= 50000 && 100000 > this.montant) {
        this.frais = 3000;
      }
      if (this.montant >= 100000) {
        // tslint:disable-next-line:radix
        this.frais = parseInt(this.montant) / 100;
      }
    }
  else {
      this.montant = 0;
    }
    const alert = await this.alertCtrl.create({
      header: 'Calculateur',
      message: 'Pour un transfert de ' + this.montant + ' francs cfa les frais s\'elevent a : ' + this.frais + ' francs fca',
      buttons: ['fermer']
    });
    alert.present();
  }
  ngOnInit() {
  }
  homebutton() {
    this.router.navigate(['/agence-users']);
  }
  logoutProcess() {
    this.authservice.logout();
  }

}
