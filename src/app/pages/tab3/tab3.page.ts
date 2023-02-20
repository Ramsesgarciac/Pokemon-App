import { Component } from '@angular/core';
import { TcgService } from '../../services/tcg.service';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private tcgS:TcgService,
    private fs:FavoritosService
  ) {}

  get favoritoslocal(){
    return this.fs.localCards;
  }

}
