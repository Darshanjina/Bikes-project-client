import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username = localStorage.getItem('username');

  constructor(private r:Router) { }

  ngOnInit() {
  }


  logout(){
    localStorage.removeItem('token');
    this.r.navigateByUrl('');
  }
}
