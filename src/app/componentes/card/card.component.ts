import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { FavoritosService } from '../../services/favoritos.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';
import { url } from 'inspector';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() card: any; //se coloca la card de cualquier tipo para que no marque error en la extraccion de datos de la api
  constructor(
    private asc:ActionSheetController,
    private favoriteServices: FavoritosService,
    private toastController: ToastController
  ) { 
  }


  ngOnInit() {
    console.log(this.card)
  }

  async ActionBoton(card: any){
    const fav = this.favoriteServices.verificarFavoritos(card);
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
          text:fav ? 'remover de favoritos' : "Agregar a favorito" ,
          icon:fav ? 'heart' : 'heart-outline',
          handler: () => {
            const resp = this.favoriteServices.agregarFavoritos(card)
            if(resp){
              this.mostrarToast('Eliminado')
            }else{
              this.mostrarToast('Agregado')
            }
          }
        },
        {
          text:'cancelar',
          role:'cancel', //con esto vemos una division entre las opciones
          icon:'close',
        },
        {
          text:'Comprar',
          icon: 'cart',
          handler: () => {
            this.openBrowser();
          }
        }
      ]
    });
    await actionSheet.present(); //este es el que permite que la fhncion funcione
  }
  async mostrarToast(msg:string){
    const toast = await this.toastController.create({
      message: `${msg} correctamente!!!`,
      duration: 3000,
      position: 'bottom',
      icon: 'message'
    })

    await toast.present()
  }

  openBrowser(){
    const open = async () => {
      await InAppBrowser.create(`${this.card.cardmarket.url}`)
    }
    open()
  }

}
