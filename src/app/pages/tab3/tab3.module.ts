import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ComponentesModule } from '../../componentes/componentes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentesModule,//importas el module para usar las cards
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
