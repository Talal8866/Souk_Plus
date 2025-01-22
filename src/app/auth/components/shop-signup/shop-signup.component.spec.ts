import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSignupComponent } from './shop-signup.component';

describe('ShopSignupComponent', () => {
  let component: ShopSignupComponent;
  let fixture: ComponentFixture<ShopSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
