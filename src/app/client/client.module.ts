import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ClientDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ClientDetailsComponent
  ]
})
export class ClientModule { }
