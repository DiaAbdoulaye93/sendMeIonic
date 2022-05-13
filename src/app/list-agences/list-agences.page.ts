import { ConnectedUserService } from './../connected-user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AdminAgencePageModule } from '../admin-agence/admin-agence.module';

@Component({
  selector: 'app-list-agences',
  templateUrl: './list-agences.page.html',
  styleUrls: ['./list-agences.page.scss'],
})
export class ListAgencesPage implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['agence', 'adresse', 'telephone', 'detailles'];
  dataSource = new MatTableDataSource<any>();
  constructor(private http: HttpClient, private dataService: ConnectedUserService,
              private router: Router) { }

  ngOnInit() {
    this.dataService.getAgences().subscribe(
      (data: any) => {
        this.dataSource.data = data['hydra:member'];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    );
  }
  homebutton() {
    this.router.navigate(['/admin-systeme']);
  }
  AddAgence() {
    this.router.navigate(['/creer-agence']);
  }
  teste(){
    alert('lazy');
  }
}
