import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular';

import { ListeTransactionsPageRoutingModule } from './liste-transactions-routing.module';

import { ListeTransactionsPage } from './liste-transactions.page';

import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Scroll } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    ListeTransactionsPageRoutingModule
  ],
  declarations: [ListeTransactionsPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ListeTransactionsPageModule {}
