import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  public uploader : FileUploader = new FileUploader({ url :'http://localhost:3000/api/uploads-file', itemAlias: 'img'});
  fileupload: File = null;

  formdata={
    name:"",
    page_url:"",
    meta_title:"",
    meta_desc:"",
    img_name:""
  }
  invalid= false;
  
  loading:boolean=false;
  constructor(private d:DataService,private r:Router) { }

  ngOnInit() {
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

  insert(){
    if(this.formdata.name === "" || this.formdata.page_url === "" || this.formdata.meta_title==="" || this.formdata.meta_desc === "" || this.formdata.img_name === ""){
      this. invalid=true;
    }
    else{
      // console.log(this.formdata);
      var headers = new HttpHeaders;
      headers = headers.set('token',localStorage.getItem('token'));
      const method='/category-insert';
      const that= this;
      this.loading=true;
      this.d.funPostMethod(method,this.formdata,{headers})
      .then(()=>{
        that.uploader.uploadAll();
        that.formdata={
          name:"",
          page_url:"",
          meta_title:"",
          meta_desc:"",
          img_name:""
        };
        that.invalid= false;
        that.r.navigateByUrl('/home/category');
      })
    }

  }

}
