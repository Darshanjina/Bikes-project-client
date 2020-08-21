import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form:any={
  username:"",
  password:""
};

notFound=false;

  constructor(private d:DataService,private r :Router) { }

  ngOnInit() {}

  login(){
    var headers = new HttpHeaders;
    
    const method = '/verify-user';
    const that = this;
    this.d.funPostMethod(method,this.form,{headers})
    .then((res)=>{
      const status = res['status'];
      if(status === "OK"){
        that.r.navigateByUrl("/home/category");
        localStorage.setItem('token',res['token']);
        localStorage.setItem('username',this.form.username);
      }
      else{
        that.notFound=true;
      }
    })
  }
}
