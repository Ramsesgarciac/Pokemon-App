import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular'; //se importa el loading
import { TcgService } from '../../services/tcg.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tipos=[ //se crea un array con los tipos de pokemon
    'Colorless',
    'Dragon',
    'Fairy',
    'Fire',
    'Grass',
    'Darkness',
    'Metal',
    'Psychic',
    'Water',
    'Fighting',
    'Lighting',
  ];

  misCards:any[]=[];

  typeSelected=this.tipos[1];

  segmentChange(evento:any){ //se coloca el segement Change
    this.mostrarLoading();// aqui se pone el mostrar loading
    this.tcg.getCardsByType(evento.detail.value).subscribe(
      (tarjetas:any)=>{
        if (tarjetas){ //este if se coloa para que se muestre la a
          this.loadCtrl.dismiss();
        }
        this.misCards=tarjetas.data
        console.log(tarjetas);
      }
    );
  }

  constructor(
    private tcg: TcgService, //se injecta el serivcio
    private loadCtrl: LoadingController //se injecta el Loading Controller
  ) {
    this.mostrarLoading();
    this.tcg.getCardsByType(this.typeSelected).subscribe(
      (tarjetas:any)=>{
        if (tarjetas){ //este if se coloa para que se muestre la a
          this.loadCtrl.dismiss();
        }
        this.misCards=tarjetas.data //console de constructor
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
