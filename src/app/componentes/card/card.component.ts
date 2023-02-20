import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() card: any; //se coloca la card de cualquier tipo para que no marque error en la extraccion de datos de la api

  constructor(
    private toastctrl:ToastController, //se importa el toast
    private asc:ActionSheetController,
    private fs: FavoritosService //se injecta el servicio de favoritos
  ) { }

  ngOnInit() {}

  async ActionBoton(card:any){ //se le coloca card:any
    const fav= this.fs.verificarFavorito(card); //se coloca esta linea
    console.log(fav);
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
          text:fav? 'remover de favoritos':'Agregar a favoritos', // se modifica el texto y el icono
          icon:fav? 'heart':'heart-outline',
          handler:()=>{ //el handler es lo que se ejecuta al darle click a este boton de favoritos
            console.log(card);
            //eliminndo la linea sobbrante se soluciona el problema
            const resp=this.fs.agregarFavorito(card); //se guarda en una constante
            if(resp){
              this.mostrarToast(
                'Eliminado'
              )
            }else{
              this.mostrarToast('Agregado');
            }
          } 
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

  async mostrarToast(msn:String){ //se crea la funcion del toast, y se le pone el msn en string
    const toast = await this.toastctrl.create(
      {
        message:`${msn} correctamente`, //se llama la variable msn y se pone el mensaje entre backs
        duration:2000,
        position:'bottom',
      }
    );
    toast.present();
  }
}
