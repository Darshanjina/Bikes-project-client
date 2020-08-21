import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { InsertComponent } from './insert/insert.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { PostComponent } from './post/post.component';
import { InsertpostComponent } from './insertpost/insertpost.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login' , component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard], children:[
    {path:'category', component:CategoryComponent,canActivate:[AuthGuard]},
    {path:'insert', component:InsertComponent,canActivate:[AuthGuard]},
    {path:'post',component:PostComponent,canActivate:[AuthGuard]},
    {path:'insert-post',component:InsertpostComponent,canActivate:[AuthGuard]}    
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
