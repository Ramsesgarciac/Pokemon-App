import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    IonicModule//este se importa para que reconozca Ionic 
  ],
  exports: [
    CardComponent //se exporta por que se ocupa externo para otras paginas
  ]
})
export class ComponentesModule { }
