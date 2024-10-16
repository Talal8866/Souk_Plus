import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/services/auth.service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private service: AuthServiceService) { }

  user: any = null;

  ngOnInit(): void {
    this.service.user.subscribe((res: any) => {
      // if(this.role){
        this.user = res
      // }
    });
  }
}
