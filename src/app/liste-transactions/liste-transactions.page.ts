import { ConnectedUserService } from './../connected-user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';
import * as _ from 'lodash';

@Component({
  selector: 'app-liste-transactions',
  templateUrl: './liste-transactions.page.html',
  styleUrls: ['./liste-transactions.page.scss'],
})
export class ListeTransactionsPage implements OnInit {
  envoiesListe = false;
  retraitListes = true;
  userRole: any = '';
  userIdentification = '';
  transactionListe = [];
  envoiesDataListe = [];
  retraitDataListe = [];
  dataSourceEnvoies;
  dataSourceRetraits;
  formulaire: any = {};
  debut = '';
  fin = '';
  debutretrait = '';
  finretrait = '';
  TitleMessage = '';
  homeUrl: any = '';
  montantEnvoies = 0;
  montantRetraits = 0;
  loadcomponent = 'RetraitSegmntOnload';
  UsersCollections: any = '';
  agence: any = '';
  fetchedData = [];
  fetchedDatas = ['1', '3', '4', '1', '3'];
  pageno: any;
  url: string;
  pageNumber = 1;
  pageLimit = 2;
  constructor(private authservice: AuthService, private router: Router, private datepipe: DatePipe,
              private dataService: ConnectedUserService,
              private alertController: AlertController) {
                this.pageno = 1;
                this.getUsers();
              //  this.loadData();
  }

  ngOnInit() {
    this.loadData(false, '');
  }

  loadData(isFirstLoad, event) {
    this.url = '?_page=' + this.pageNumber + '&_limit=' + this.pageLimit;
    this.authservice.getData().then(res => {
      this.userIdentification = res.username;
      this.userRole = res.roles[0];
      this.dataService.getTransactionsForliste(this.url).subscribe(
        (data: any) => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data['hydra:member'].length; i++) {
             this.fetchedData.push(data['hydra:member'][i]);
             this.fetchedData = _.uniqBy(this.fetchedData, 'id');
            }
          if (isFirstLoad) {
            event.target.complete();
          }
          this.pageNumber++;
          if (this.userRole === 'ROLE_Admin_system') {
            this.TitleMessage = 'Liste de toutes les transactions';
            this.homeUrl = '/admin-systeme';
            this.transactionListe = this.fetchedData;
          }
          else {
            if (this.userRole === 'ROLE_Admin_Agence') {
              //  this.userRole === 'ROLE_Simple_agent' ||
              this.homeUrl = '/agence-users';
              this.TitleMessage = 'Liste de toutes les transactions de l\'agence';
              console.log(this.fetchedData);
              this.fetchedData.forEach(element => {
                if (element.compte) {
                  if (element.compte.agence.id === this.agence) {
                    this.envoiesDataListe.push(element);
                    this.montantEnvoies = this.montantEnvoies + element.montant;
                  }
                }
                if (element.comptederetrait) {
                  if (element.comptederetrait.agence.id === this.agence) {
                    this.retraitDataListe.push(element);
                    this.montantRetraits = this.montantRetraits + element.montant;
                  }
                }
              });
            }
            else if (this.userRole === 'ROLE_Simple_agent') {
              this.homeUrl = '/agence-users';
              this.TitleMessage = 'Liste de mes transctions';
              this.fetchedData.forEach(element => {
                if (element.user.telephone === this.userIdentification) {
                  if (element.compte) {
                    this.envoiesDataListe.push(element);
                    this.montantEnvoies = this.montantEnvoies + element.montant;
                  }
                  if (element.comptederetrait) {
                    this.retraitDataListe.push(element);
                    this.montantRetraits = this.montantRetraits + element.montant;
                  }
                }
              });
            }
          }
          //  element.user.telephone === this.userIdentification
          //  this.dataSourceEnvoies = new MatTableDataSource(this.envoiesDataListe);
          //  this.dataSourceEnvoies.paginator = this.paginator;
          //  this.dataSourceEnvoies.sort = this.sort;
          console.log(this.envoiesDataListe);
          // this.dataSourceRetraits = new MatTableDataSource(this.retraitDataListe);
          // this.dataSourceRetraits.paginator = this.paginator;
          // this.dataSourceRetraits.sort = this.sort;
          console.log(this.retraitDataListe);
        },
        error => {
          console.log(error);
        });
    });
  }
  doInfinite(event) {
    this.loadData(true, event);
  }
  getUsers() {
    this.authservice.getData().then(res => {
      this.userIdentification = res.username;
      this.userRole = res.roles[0];
      this.dataService.getUsers().subscribe(
        (data: any) => {
          this.UsersCollections = data['hydra:member'];
          this.UsersCollections.forEach(element => {
            if (element.telephone === this.userIdentification) {
              // tslint:disable-next-line:no-unused-expression
              this.agence = element.agence.id;
              return this.agence;
            }
          });
        }
      );
    });
  }
  showRetraits() {
    this.loadcomponent = 'EnvoiesButtonClicked';
    this.envoiesListe = true;
    this.retraitListes = false;

  }
  showEnvoies() {
    this.loadcomponent = 'RetraitSegmntOnload';
    this.envoiesListe = false;
    this.retraitListes = true;
  }
  homebutton() {
    this.router.navigate([this.homeUrl]);
  }
  filterEnvois(event) {
    if (this.formulaire.debut){
       this.envoiesDataListe = this.envoiesDataListe.filter(datas => {
        const thatDate =  this.datepipe.transform(datas.createdAt, 'yyyy-MM-dd');
        if ((thatDate > this.formulaire.debut || thatDate === this.formulaire.debut)
             && (thatDate < this.formulaire.fin || thatDate === this.formulaire.fin)) {
          return datas;
        }
      });
    }
    else{
      this.InvalideStartDate();
    }
  }
  filterRetrait(event) {
    if (this.formulaire.debutretrait){
      this.retraitDataListe = this.retraitDataListe.filter(datas => {
        const thatDate =  this.datepipe.transform(datas.date_retrait, 'yyyy-MM-dd');
        if ((thatDate > this.formulaire.debutretrait || thatDate === this.formulaire.debutretrait) &&
            (thatDate < this.formulaire.finretrait || thatDate === this.formulaire.finretrait)) {
          return datas;
        }
      });
    }
    else{
      this.InvalideStartDate();
    }
  }
  async InvalideStartDate(){
    const alert = await this.alertController.create({
      cssClass: 'custom',
      header: 'Nous ne pouvos pas executer cette requete',
      message: 'Veuillez renseigner la date de debut',
      buttons: ['OK']
    });
    await alert.present();
  }
}
