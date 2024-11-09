import { Component, Input } from '@angular/core';
import { HomeServiceService } from '../../services/home-service.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent {
  constructor(private service:HomeServiceService){}

  feturedShops: any[] = [];
  feturedProducts: any[] = [];

  ngOnInit(){
    this.getFeturedProducts_Here();
    this.getFeturedShops_Here();
  }

  getFeturedProducts_Here(){
    this.service.getFeaturedProducts().subscribe(res=>{
      res = this.feturedProducts;
      console.log(res);

    })
  }

  getFeturedShops_Here(){
    this.service.getFeaturedShops().subscribe(res=>{
      res = this.feturedShops;
      console.log(res);
    })
  }

}
