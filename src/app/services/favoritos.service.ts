import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  misFavoritos:any[]=[]; //creamos el array

  existe:any;//creamos este

  constructor() { }

  cargarFavoritos(){
    return this.misFavoritos=JSON.parse(localStorage.getItem('favoritos')||'{}')||[];
  }
}
