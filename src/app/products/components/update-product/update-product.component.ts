import { Component, Input } from '@angular/core';
import { ShopServiceService } from 'src/app/shop/services/shop-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  constructor(private shop_service: ShopServiceService) { }

  updateProductForm!: FormGroup;
  @Input() name: any = {};  
  base64: any = '';

  ngOnInit(): void {
    this.updateProductForm = new FormGroup({
      productname: new FormControl(),
      availability: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
      image: new FormControl(),
      quantity: new FormControl(),
    })
  }

  submitUpdate() {
    const model = {
      name: this.updateProductForm.value.productname,
      availability: this.updateProductForm.value.availability,
      description: this.updateProductForm.value.description,
      price: this.updateProductForm.value.price,
      pictures: this.updateProductForm.value.image,
      quantity: this.updateProductForm.value.quantity
    }
    this.shop_service.updateProduct(model).subscribe((res: any) => {
      res = alert("your product update successfully")
    })
  }

  getimagepath(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result
      this.updateProductForm.get('image')?.setValue(this.base64)
    }
  }
}
