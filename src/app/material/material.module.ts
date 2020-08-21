import { NgModule } from '@angular/core';
import{ MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule,MatRippleModule, MatPaginatorModule } from '@angular/material';

const MaterialComponent=[
  MatButtonModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatPaginatorModule
]

@NgModule({
  imports: [MaterialComponent],
  exports: [MaterialComponent]
})
export class MaterialModule { }
