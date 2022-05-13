import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreerAgencePageRoutingModule } from './creer-agence-routing.module';

import { CreerAgencePage } from './creer-agence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreerAgencePageRoutingModule
  ],
  declarations: [CreerAgencePage]
})
export class CreerAgencePageModule {}
