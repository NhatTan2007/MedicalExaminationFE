import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { MedicalRecord } from 'src/app/_shared/models/medicalRecord.Models';
import { ImageService } from 'src/app/_shared/services/image-service/image-service.service';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';

@Component({
  selector: 'app-image-analysation',
  templateUrl: './image-analysation.component.html',
  styleUrls: ['./image-analysation.component.scss'],
})
export class ImageAnalysationComponent implements OnInit {

  imgDefault : "api.khamskdinhky.tech:5001/uploads/b98243bd-3604-457a-b9a1-67beeb4bbea4_bacsi.jpg";

  medicalRecord: MedicalRecord;
  constructor(
    private medicalRecordService: MedicalRecordService,
    private imageService: ImageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.medicalRecord = this.medicalRecordService.medicalRecord;
  }

  getInfo() {
    console.log(this.medicalRecord);
  }


  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;


  // The fileProgress method will called when the user choose file It will get the file object of selected file and store in the fileData.
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.http
      this.imageService.uploadImage(formData).subscribe(
      (res) => {
        console.log('success');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
