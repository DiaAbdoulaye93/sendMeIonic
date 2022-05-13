import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfertPageRoutingModule } from './transfert-routing.module';
import { TransfertPage } from './transfert.page';
import { ComponentsModule } from '../components/components.module';
import { Routes, RouterModule } from '@angular/router';
import { RecieverComponent } from '../reciever/reciever.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TransfertPage
      },
      {
        path: 'depot',
        loadChildren: '../depot/depot.module#DepotPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransfertPage],
 /* schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] */
})

export class TransfertPageModule {}
