import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  misFavoritos:any[]=[]; //creamos el array

  existe:any;//creamos este

  delete=true;//se crea esta variable booleana

  constructor(
  ) { 
    this.cargarFavoritos();
  }

  cargarFavoritos(){
    return this.misFavoritos=JSON.parse(localStorage.getItem('favoritos')||'[]')||[]; //estos se hacen corchetes para recibir un arreglo
  }

  agregarFavorito(card:any){

    console.log('Favoritos actuales', this.misFavoritos);
    
    if(this.misFavoritos){ //si hay algo en mis favoritos entonces  //13/2/2023
      this.existe=this.misFavoritos.find( //va a buscar
        c => c.id===card.id //la peticion dice que se va a buscar por el id de la card
      );
      console.log('Si');
      
    }
    if(this.existe){ //si esta carta ya existe en existe
      this.delete=true; //se pone esta variable
      console.log(this.existe);
     this.misFavoritos = this.misFavoritos.filter(c=>c.id !== card.id) //filter es un filtrado, similar al unshift, pero solo pondra la card delid que coincida
    }else{
      this.delete=false; //lo mismo de arriba pero en false
      this.misFavoritos.unshift(card); //el unshift coloca el elemento al principio del array
    }
    localStorage.setItem('favoritos',JSON.stringify(this.misFavoritos));
    return this.delete; //se retorna el delete, este se pone asi por que es lo ultimo que se hace con esta variable
  }

  verificarFavorito(card:any){
    return !! this.misFavoritos.find(c=>c.id===card.id);
  }

  get localCards(){
    return[...this.misFavoritos];
  }
}
