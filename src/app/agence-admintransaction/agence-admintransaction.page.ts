import { ConnectedUserService } from './../connected-user.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-agence-admintransaction',
  templateUrl: './agence-admintransaction.page.html',
  styleUrls: ['./agence-admintransaction.page.scss'],
})
export class AgenceAdmintransactionPage implements OnInit {
  transactionListe: string[] = [];
  envoiesDataListe: string[] = [];
  retraitDataListe: string[] = [];
  dataSourceEnvoies;
  dataSourceRetraits;
  envoiesListe = false;
  retraitListes = true;
  montantEnvoies = 0;
  montantRetraits = 0;
  loadcomponent = 'RetraitSegmntOnload';
  dataSource;
  homeUrl = '/agence-users';
  UsersCollections: any = '';
  agence: any = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['date', 'emeteur', 'montant', 'frais'];
  fetchedData: any;
  userIdentification: any;
  constructor(private authservice: AuthService, private router: Router, private dataService: ConnectedUserService) { }
  ngOnInit() {
    this.authservice.getData().then(res => {
      this.userIdentification = res.username;
      this.dataService.getTransactions().subscribe(
        (data: any) => {
          this.fetchedData = data['hydra:member'];
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
          this.dataSourceEnvoies = new MatTableDataSource(this.envoiesDataListe);
          this.dataSourceEnvoies.paginator = this.paginator;
          this.dataSourceEnvoies.sort = this.sort;
          console.log(this.dataSourceEnvoies);
  
          this.dataSourceRetraits = new MatTableDataSource(this.retraitDataListe);
          this.dataSourceRetraits.paginator = this.paginator;
          this.dataSourceRetraits.sort = this.sort;
          console.log(this.dataSourceRetraits);
        }
      );
    //  this.userRole = res.roles[0];
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
}
