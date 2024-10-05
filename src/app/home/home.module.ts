import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { VisitorComponent } from './components/visitor/visitor.component';
import { ActiveComponent } from './components/active/active.component';
import { ContentsComponent } from './components/contents/contents.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AboutUsComponent,
    VisitorComponent,
    ActiveComponent,
    ContentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AboutUsComponent,
    VisitorComponent,
    ActiveComponent,
    ContentsComponent
  ]

})
export class HomeModule { }
