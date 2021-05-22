import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { MedicalRecordViewRes, QueryMedicalRecordsRes } from 'src/app/_shared/models/medicalRecord.Models';
import { MedicalRecordService } from 'src/app/_shared/services/medicalRecord/medical-record.service';
import { PrintService } from 'src/app/_shared/services/print-service/print.service';

@Component({
	selector: 'app-medical-record-list',
	templateUrl: './medical-record-list.component.html',
	styleUrls: ['./medical-record-list.component.scss']
})
export class MedicalRecordListComponent implements OnInit {
	// createOrganizationPath = "/auth/phong-tong-hop/tao-to-chuc"
	medicalRecords: MedicalRecordViewRes[] = []
	medicalRecordsSearch$: Observable<QueryMedicalRecordsRes>
	medicalRecords$: Observable<QueryMedicalRecordsRes>
	listPageSize = [
		{label: "10", value: 10},
		{label: "20", value: 20},
		{label: "50", value: 50},
		{label: "100", value: 100}]
	pageSize = this.listPageSize[0]
	currentPage = 1
	totalMedicalRecords = 0
	key = ''
	// organization: Organization
	ordinalNumber = (this.currentPage - 1) * this.pageSize.value
	

	constructor(private medicalRecordService: MedicalRecordService,
				private router: Router,
				private spinner: NgxSpinnerService,
				private printService: PrintService,
				private notification: NzNotificationService){}

	ngOnInit(): void {
		this.spinner.show();
		this.GetMedicalRecordsWithPagination(this.currentPage, this.pageSize.value);
	}

	GetMedicalRecordsWithPagination(currentPage: number, pageSize: number){
		this.medicalRecords$ = this.medicalRecordService.GetMedicalRecordsWithPagination(currentPage, pageSize);
		this.medicalRecords$.subscribe((res) =>{
					this.medicalRecords = res.medicalRecords
					this.totalMedicalRecords = res.totalMedicalRecords
					this.spinner.hide();
					},
					(err) => {
							this.spinner.hide();
					})
	}

	// GetDetailsOrganization(organizationId: string){
	// 	this.router.navigate(['/auth/phong-tong-hop/chi-tiet', organizationId])
	// }

	SearchMedicalRecordsWithPagination(key: string, currentPage: number, pageSize: number){
		this.medicalRecordsSearch$ = this.medicalRecordService
			.SearchMedicalRecordsWithPagination(key, currentPage, pageSize);
		this.medicalRecordsSearch$.subscribe((res )=>{
						this.medicalRecords = res.medicalRecords
						this.totalMedicalRecords = res.totalMedicalRecords
						this.spinner.hide();
					}, (err) => {
						this.spinner.hide();		
					})
	
	}

	changePage(){
		this.ordinalNumber = (this.currentPage - 1) * this.pageSize.value
		if(this.key.trim() == ''){
			this.GetMedicalRecordsWithPagination(this.currentPage, this.pageSize.value);
		} else{
			this.SearchMedicalRecordsWithPagination(this.key, this.currentPage, this.pageSize.value);
		}
	}

	changePageSize(value: any){
		this.pageSize = value
		this.currentPage = 1
		if(this.key.trim() == ''){
			this.GetMedicalRecordsWithPagination(this.currentPage, this.pageSize.value);
		} else{
			this.SearchMedicalRecordsWithPagination(this.key, this.currentPage, this.pageSize.value);
		}
	}

	inputSearch(key: string){
		this.key = key;
		if(this.key == ''){
			this.GetMedicalRecordsWithPagination(this.currentPage, this.pageSize.value);
		} else{
			this.SearchMedicalRecordsWithPagination(this.key, this.currentPage, this.pageSize.value);
		}
	}

	printMedicalExaminationResult(medicalRecord: MedicalRecordViewRes){
		if(medicalRecord.isActive && medicalRecord.dateCompleted > 0){
			this.spinner.show();
			this.printService.printExaminationResult(medicalRecord.medicalRecordId)
			.subscribe((data: Blob) => {
				var file = new Blob ([data], {type: 'application/pdf'})
				var fileUrl = URL.createObjectURL(file);

				// if you want to open PDF in new tab
				var a = document.createElement('a');
				a.href = fileUrl;
				a.target = '_blank';
				a.click();
				this.spinner.hide();
			}, (err) => {
				this.spinner.hide();
				if(err.status == 400 || err.status == 401){
					this.notification.blank('Thất bại', "Xin mời liên lạc với Quản trị viên",
												{nzClass: "error text-white", nzAnimate: true})
				}
			})
		} else {
			this.notification.blank('Thất bại', "Bệnh án chưa kích hoạt hoặc chưa hoàn thành",
										{nzClass: "error text-white", nzAnimate: true})
		}
	}

	
}
