import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-insertpost',
  templateUrl: './insertpost.component.html',
  styleUrls: ['./insertpost.component.css']
})
export class InsertpostComponent implements OnInit {
  
  public Editor = ClassicEditor;
  public uploader : FileUploader = new FileUploader({ url :'http://localhost:3000/api/uploads-file', itemAlias: 'img'});
  fileupload: File = null;

  formdata={
    cat_id:"",
    cat_name:"",
    title:"",
    summary:"",
    page_url:"",
    meta_title:"",
    meta_desc:"",
    img_name:""
  };
  invalid= false;

  loading:boolean=false;

  postlist:any=[];
  constructor(private d:DataService,private r:Router) { }

  ngOnInit() {
    this.getCategory();
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false};
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any)=>{
      // console.log(item.file.name);
    }
  }

  getImageName(x){
    // console.log(x);
    // console.log(x.srcElement.files);
    // console.log(x.srcElement.files[0].name);
    this.formdata.img_name=x.srcElement.files[0].name;
  }
  
  getCategory(){
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
  
  insert(){
    if(this.formdata.cat_id === "" || this.formdata.cat_name === "" || this.formdata.title === "" || this.formdata.summary === "" || this.formdata.page_url === "" || this.formdata.meta_title==="" || this.formdata.meta_desc === "" || this.formdata.img_name===""){
      this.invalid=true;
      console.log(this.formdata);

    }
    else{
      var headers = new HttpHeaders;
      headers = headers.set('token',localStorage.getItem('token'));
      const method='/post-insert';
      const that= this;
      this.loading=true;
      this.d.funPostMethod(method,this.formdata,{headers})
      .then(()=>{
        that.loading = false;
        that.invalid = false;
        that.uploader.uploadAll();
        // console.log(this.formdata);
        that.formdata={
          cat_id:"",
          cat_name:"",
          title:"",
          summary:"",
          page_url:"",
          meta_title:"",
          meta_desc:"",
          img_name:""
        };
        that.r.navigateByUrl('/home/post');
      })
    }

  }

}
