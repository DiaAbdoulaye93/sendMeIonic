import { RecieverComponent } from './../reciever/reciever.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimpleAgentPageRoutingModule } from './simple-agent-routing.module';

import { SimpleAgentPage } from './simple-agent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimpleAgentPageRoutingModule
  ],
  declarations: [SimpleAgentPage]
})
export class SimpleAgentPageModule {}
