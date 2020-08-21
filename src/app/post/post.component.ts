import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FileUploader} from 'ng2-file-upload';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cat_id', 'cat_name', 'title', 'summary', 'page_url', 'meta_title', 'meta_desc', 'img_name', 'edit', 'delete'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public Editor = ClassicEditor;

  public uploader : FileUploader = new FileUploader({url :'http://localhost:3000/api/uploads-file',itemAlias: 'img'});
  fileupload: File = null;
  
  list:any = [];

  postlist:any=[];
  formdata={
    _id:"",
    cat_id:"",
    cat_name:"",
    title:"",
    summary:"",
    page_url:"",
    meta_title:"",
    meta_desc:"",
    img_name:""
  }
  invalid= false;

  loading:boolean = false;

  // imgpath="../../assets/uploads";
  
  constructor(private d:DataService) { }

  ngOnInit() {
    this.getpost();
    this.getcategory();
    this.uploader.onAfterAddingFile = (file) =>{file.withCredentials = false};
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any)=>{
      console.log(item.file.name);
    }
  }

getImageName(x){
  this.formdata.img_name = x.srcElement.files[0].name;
}

  
  getcategory(){
    var headers = new HttpHeaders;
    headers = headers.set('token',localStorage.getItem('token'));

    const method = '/category-select'
    const that= this;
    this.loading = true;
    this.d.funGetMethod(method,{headers})
    .then((res)=>{
      that.loading = false;
      const data = res['message'];
      that.postlist=data;
    })
  }

  Catname(){
    var headers = new HttpHeaders;
    headers = headers.set('token',localStorage.getItem('token'));

    const method = '/category-details'
    const that = this;
    this.loading = true;
    this.d.funPostMethod(method,{_id:this.formdata.cat_id},{headers})
    .then((data)=>{
      that.loading = false;
      var catdetails = data['message'];
      that.formdata.cat_name = catdetails.name;
    })
  }

  getpost(){
    var headers = new HttpHeaders;
      headers = headers.set('token',localStorage.getItem('token'));
    const method = '/post-select';
    const that= this;
    this.loading = true;
    this.d.funGetMethod(method,{headers})
    .then((data)=>{
      that.loading = false;
      that.list=data['message'];
      that.dataSource = new MatTableDataSource<PeriodicElement>(that.list);
      that.dataSource.paginator = that.paginator;
      console.log(this.list);
    })
  }

  delete(x){
    var headers = new HttpHeaders;
      headers = headers.set('token',localStorage.getItem('token'));
    const method = '/post-remove';
    const that= this;
    this.loading = true;
    this.d.funPostMethod(method, {_id:x},{headers})
    .then(()=>{
      that.loading = false;
      that.getpost();
    })
  }

  edit(record){
    this.formdata=record;
  }

  update(){

    if(this.formdata.cat_id === "" || this.formdata.cat_name === "" || this.formdata.title === "" || this.formdata.summary === "" || this.formdata.page_url === "" || this.formdata.meta_title==="" || this.formdata.meta_desc === "" || this.formdata.img_name === ""){
      this. invalid=true;
      this.getpost();
      alert("Please fill all the details !!!");
    }
    else{
      var headers = new HttpHeaders;
      headers = headers.set('token',localStorage.getItem('token'));

      const method = "/post-update";
      const that = this;
      this.loading = true;
    this.d.funPostMethod(method,this.formdata,{headers})
    .then(()=>{
      that.loading = false;
      that.getpost();
      that.invalid=false;
      that.uploader.uploadAll();
      // console.log(this.formdata);
      that.formdata={
        _id:"",
        cat_id:"",
        cat_name:"",
        title:"",
        summary:"",
        page_url:"",
        meta_title:"",
        meta_desc:"",
        img_name:""
      }
    })
    }
  }
}


export interface PeriodicElement {
  id: string;
  cat_id: string;
  cat_name: string;
  title: string;
  summary: string;
  page_url: string;
  meta_title: string;
  meta_desc: string;
  img_name: string;
}