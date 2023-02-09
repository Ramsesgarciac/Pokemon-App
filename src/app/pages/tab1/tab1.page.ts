import { Component } from '@angular/core';
import { TcgService } from '../../services/tcg.service';
import { LoadingController } from '@ionic/angular'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  cards:any[]=[]; //se crea un arreglo de tipo any
  constructor(
    private loadCtrl: LoadingController,
    private tcgS:TcgService //aqui se injecta el servicio
  ) {
    this.mostrarLoading();
    this.tcgS.getCards().subscribe( // aqui tomamos la funcion de getcards que esta en el tcg service y muestra todas las cartas
      (cards:any)=>{ //ponemos la "variable" cards
        if (cards){ //este if se coloa para que se muestre la a
          this.loadCtrl.dismiss();
        }
        console.log(cards) //se imprime cards que pusimos en la linea de arriba
        this.cards=cards.data //aqui se llama el arreglo cards de arriba
        //el error de data se arrelga con (cards:any) de la linea 16
      }
    );
  }

  async mostrarLoading(){ //se cra el async para utilizar el loading
    const load= await this.loadCtrl.create(
      {
        message:'Cargando pokemons!',
        translucent:true,
        spinner:'dots',
      }
    );
    await load.present();
  }
}
