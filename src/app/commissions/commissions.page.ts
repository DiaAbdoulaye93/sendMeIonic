import { MatTableDataSource } from '@angular/material/table';
import { ConnectedUserService } from './../connected-user.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.page.html',
  styleUrls: ['./commissions.page.scss'],
})
export class CommissionsPage implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['date', 'type', 'montant'];
  fetchedData: any;
  userRole: any;
  userIdentification: any;
  UsersCollections: any;
  agenceUser: any;
  commissionList: string[] = [];
  dataSourceCommission;
  montantCommission = 0;
  constructor(private authservice: AuthService, private router: Router, private dataService: ConnectedUserService) { }

  ngOnInit() {
    this.authservice.getData().then(res => {
      this.userIdentification = res.username;
      this.userRole = res.roles[0];
      this.dataService.getUsers().subscribe(
        (data: any) => {
          this.UsersCollections = data['hydra:member'];
          this.UsersCollections.forEach(element => {
            if (element.telephone === this.userIdentification) {
              this.agenceUser = element.agence.id;
              console.log(this.agenceUser);
            }
          });
        }
      );
      this.dataService.getCommissions().subscribe(
        (data: any) => {
          this.fetchedData = data['hydra:member'];
          this.fetchedData.forEach(element => {
            if (element.transaction.compte.agence.id === this.agenceUser) {
              this.commissionList.push(element);
              this.montantCommission = this.montantCommission + element.montant;
            }
          });
          this.dataSourceCommission = new MatTableDataSource(this.commissionList);
          this.dataSourceCommission.paginator = this.paginator;
          this.dataSourceCommission.sort = this.sort;
          console.log(this.dataSourceCommission);

        });
    });
  }
  homebutton() {
    this.router.navigate(['/agence-users']);
  }
}
