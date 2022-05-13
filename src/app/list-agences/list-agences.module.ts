import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAgencesPageRoutingModule } from './list-agences-routing.module';

import { ListAgencesPage } from './list-agences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    ListAgencesPageRoutingModule
  ],
  declarations: [ListAgencesPage]
})
export class ListAgencesPageModule {}
