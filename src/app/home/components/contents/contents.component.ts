import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent {
  @Input() products: any[] = [];
  @Input() categories: any[] = [];
  @Input() shops: any[] = [];

}
