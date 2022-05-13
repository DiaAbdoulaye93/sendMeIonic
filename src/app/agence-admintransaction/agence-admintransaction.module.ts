import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenceAdmintransactionPageRoutingModule } from './agence-admintransaction-routing.module';

import { AgenceAdmintransactionPage } from './agence-admintransaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgenceAdmintransactionPageRoutingModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  declarations: [AgenceAdmintransactionPage]
})
export class AgenceAdmintransactionPageModule {}
