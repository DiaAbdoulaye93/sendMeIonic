import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientInterfacePageRoutingModule } from './client-interface-routing.module';

import { ClientInterfacePage } from './client-interface.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientInterfacePageRoutingModule
  ],
  declarations: [ClientInterfacePage]
})
export class ClientInterfacePageModule {}
