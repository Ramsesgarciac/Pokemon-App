import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TcgService } from '../../services/tcg.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  card:any={}

  constructor(
    private ar:ActivatedRoute, //se injecta el Activated route
    private tcgs:TcgService
    ) { 
    this.ar.params.subscribe(
      (p:any)=>{
        console.log(p)
        this.tcgs.getCard(p.id).subscribe(
          (card:any)=>{
            console.log(card)
            this.card=card.data
          }
        )
      }
    );
  }

  ngOnInit() {
  }

  
}
