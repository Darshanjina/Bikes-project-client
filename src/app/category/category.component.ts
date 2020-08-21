import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';
import{ FileUploader} from 'ng2-file-upload';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  
  displayedColumns: string[] = ['id', 'name', 'page_url', 'meta_title', 'meta_desc','img_name','edit', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public uploader : FileUploader = new FileUploader({url :'http://localhost:3000/api/uploads-file',itemAlias: 'img'});
  fileupload: File = null;

  records:any = [];
  formdata={
    name:"",
    page_url:"",
    meta_title:"",
    meta_desc:"",
    img_name:""
  }
  invalid:boolean = false;

  loading:boolean = false;
  constructor( private d:DataService){ }

  ngOnInit() {
    this.getRecords();
    this.uploader.onAfterAddingFile = (file) =>{file.withCredentials = false};
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any)=>{
      console.log(item.file.name);
    }
  }

  getImageName(x){
    this.formdata.img_name = x.srcElement.files[0].name;
  }
  

  getRecords(){
    var headers = new HttpHeaders;
      headers = headers.set('token',localStorage.getItem('token'));
    const method = '/category-select';
    const that= this;
    this.loading = true;
    this.d.funGetMethod(method,{headers})
    .then((data)=>{
      that.loading = false;
      that.records=data['message'];
      that.dataSource  = new MatTableDataSource<PeriodicElement>(that.records);
      that.dataSource.paginator = that.paginator;
    })
  }


  edit(record){
    this.formdata=record;
  }

  update(){

    if(this.formdata.name === "" || this.formdata.page_url === "" || this.formdata.meta_title==="" || this.formdata.meta_desc === "" || this.formdata.img_name === ""){
      this. invalid=true;
      this.getRecords();
    }
    else{
      var headers = new HttpHeaders;
      headers = headers.set('token',localStorage.getItem('token'));

      const method = "/category-update";
      const that = this;
      this.loading = true;
    this.d.funPostMethod(method,this.formdata,{headers})
    .then(()=>{
      that.loading = false;
      that.invalid=false;
      that.formdata={
        name:"",
        page_url:"",
        meta_title:"",
        meta_desc:"",
        img_name:""
      }
      that.getRecords();
    })
    }
  }

  delete(x){
    var headers = new HttpHeaders;
      headers = headers.set('token',localStorage.getItem('token'));
    const method = '/category-remove';
    const that= this;
    this.loading = true;
    this.d.funPostMethod(method, {_id:x},{headers})
    .then(()=>{
      that.loading = false;
      that.getRecords();
    })
  }

  modalclose(){
    this.uploader.uploadAll();
  }
  
}

export interface PeriodicElement {
  id: string;
  name: string;
  page_url: string;
  meta_title: string;
  meta_desc: string;
  img_name:string;
}
