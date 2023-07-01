import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { FavoritosService } from '../../services/favoritos.service';
import { url } from 'inspector';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { Router } from '@angular/router';

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
    private toastController: ToastController,
    private pf:Platform, //importamos el Platform
    private route:Router //se importa el router
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
          handler:()=>{
            this.compartir();
          }
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

  async openBrowser(){
    if(this.pf.is('ios')||this.pf.is('android')){
      await Browser.open({url:''});
    }else{
      console.log('solo para celulares');
      window.open(this.card.cardmarket.url,'_blank')
    }
  }

  async compartir(){
    await Share.share({
      title:'te comparto esta card',
      text:this.card.name,
      url:this.card.cardmarket.url
    });
  }

  verDetalles(id:any){ //esta funcion nos atyudara a ver los detalles de la carta seleccionada por su id
    this.route.navigate(['/detail',id]);
  }
}
