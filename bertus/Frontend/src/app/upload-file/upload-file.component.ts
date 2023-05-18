import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { not } from '@angular/compiler/src/output/output_ast';
import { Host } from 'src/host';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  //selectedFile: File = {} as File;
  selectedFile: any = null;
  uploadForm!: FormGroup;
  errorMsg = '';
  submissionResult: any;

  constructor(private readonly http: HttpClient, private formBuilder: FormBuilder) { }

  backendUrl = Host.getUrl();
  
  url = this.backendUrl + "/api/FileUpload/uploadFile"; //+ "?username=dule";

  ngOnInit(): void {

    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile')!.setValue(file);
    }
  }

  sendToBack() {
    const formData: FormData = new FormData();
    //formData.append("file", this.uploadForm.get('profile')!.value);
    //formData.append("username", "dule");
    
    // this.http.post(this.url, formData).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
    console.log(this.url);
    this.http.post(this.url, formData).subscribe((result:any) => {
      console.log(result.filename);
      console.log(result.headers);
      //console.log(result.data);
      
      return result;
    });
  }

  








  chooseFile(files: FileList | null) {
    this.selectedFile = files;
  }


  upload(){

    console.log("test");

    if (!this.selectedFile) {
      this.errorMsg = 'Please choose a file.';
      //return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    return this.http.post(this.url, formData).subscribe((result:any) => {
      console.log(result.filename);
      console.log(result.headers);
    });
  }

}


