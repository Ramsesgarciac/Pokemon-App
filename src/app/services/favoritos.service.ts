import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  misFavoritos:any[]=[]; //creamos el array
  delete = true
  existe:any;//creamos este

  constructor() { 
    this.cargarFavoritos()
  }

  cargarFavoritos(){
    return this.misFavoritos=JSON.parse(localStorage.getItem('favoritos')||'[]')||[];
  }

  agregarFavoritos(card:any){
    if(this.misFavoritos){
      this.existe = this.misFavoritos.find((c) => c.id === card.id)
    }

    if(this.existe){
      this.misFavoritos = this.misFavoritos.filter(c => c.id !== card.id)
      this.delete = true
      console.log(this.existe)
    }else{
    this.misFavoritos.unshift(card) 
    this.delete = false
    }
    localStorage.setItem('favoritos', JSON.stringify(this.misFavoritos))
    return this.delete
  }

  verificarFavoritos(card:any){
    return !!this.misFavoritos.find(c => c.id===card.id)
  }

  get localCards(){
    return [...this.misFavoritos]
  }

}
