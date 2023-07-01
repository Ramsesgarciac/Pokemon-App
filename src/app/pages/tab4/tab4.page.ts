import { Component, OnInit } from '@angular/core';
import { TcgService } from '../../services/tcg.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  cards :any[] = []

  constructor(
    private tcgs:TcgService,
    
    ) { }

  ngOnInit() {
  }
  
  buscar(e:any){
    console.log(e.detail.value)
    if(e.detail.value=== ""){
      return;
    }
    this.tcgs.getCardsByName(e.detail.value).subscribe((c:any) => {
      console.log(c.data)
      this.cards = c.data
    })
  }

}
