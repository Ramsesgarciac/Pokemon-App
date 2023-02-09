import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() card: any; //se coloca la card de cualquier tipo para que no marque error en la extraccion de datos de la api

  constructor(
    private asc:ActionSheetController
  ) { }

  ngOnInit() {}

  async ActionBoton(){
    const actionSheet = await this.asc.create({
      header: '¿Que quiere hacer con esta carta?',
      backdropDismiss:true,
      mode: 'ios', //aqui se aplica el mode en ios 
      subHeader:'elige una opcion', //este es un subtitulo
      buttons: [
        {
          text:'compartir',
          icon:'share',
        },
        {
          text:'favorito',
          icon:'heart',
        },
        {
          text:'cancelar',
          role:'cancel', //con esto vemos una division entre las opciones
          icon:'close',
        },
      ]
    });
    await actionSheet.present(); //este es el que permite que la fhncion funcione
  }
}
