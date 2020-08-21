import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { NavComponent } from './nav/nav.component';
import { InsertComponent } from './insert/insert.component';
import{ HttpClientModule} from '@angular/common/http';
import{ FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { InsertpostComponent } from './insertpost/insertpost.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {FileUploadModule} from 'ng2-file-upload';
import { CutPipe } from './cut.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ MaterialModule } from './material/material.module';
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    NavComponent,
    InsertComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PostComponent,
    InsertpostComponent,
    CutPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
