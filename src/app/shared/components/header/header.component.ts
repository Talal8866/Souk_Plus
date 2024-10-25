import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/services/auth.service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private service: AuthServiceService) { }

  currentUser: any = null;
  user: any = null;

  ngOnInit(): void {
    // this.service.user.subscribe((res: any) => {
    //     this.user = res
    // });
    this.currentUser = this.service.getCurrentUser();
  }

  
}
