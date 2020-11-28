import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeDataService } from 'src/app/shared/employee.data.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Employee } from '../request/employee.request';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html'
})
export class ListEmployeeComponent implements OnInit {

  constructor(
    private dataService: EmployeeDataService,
    private notificationService: NzNotificationService,
    private fb: FormBuilder,
    private modal: NzModalService) {}

  validateForm!: FormGroup;
  control: FormControl;
  listOfData: Employee[];
  pageIndex: number;
  pageSize: number;
  total: number;
  loading: boolean;
  isVisible: boolean;
  isOkLoading: boolean;
  idToUpdate: string;
  errorRegistration: string;

  ngOnInit(): void {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.loading = true;
    this.isVisible = false;
    this.isOkLoading = false;
    this.createForm();
    this.paginate(this.pageIndex - 1, this.pageSize);
  }

  onPageIndexChange(event: number): void {
      this.pageIndex = event;
      if (event === 1) {
        this.paginate(this.pageIndex - 1, this.pageSize);
      } else {
        this.paginate((this.pageSize * (this.pageIndex - 1)), this.pageSize);
      }
  }

  onPageSizeChange(event: number): void {
      this.pageSize = event;
      this.pageIndex = 1;
      this.paginate(this.pageIndex - 1, this.pageSize);
  }

  paginate(index: number, size: number): void {
    this.dataService.countEmployee()
    .subscribe(data => {
      this.total = data.response;
      this.dataService.listEmployee(index, size)
      .subscribe(values => {
        this.listOfData = [...values.response];
        this.loading = false;
      });
    });
  }

  showModal(id: string): void {
    this.isVisible = true;
    this.idToUpdate = id;
    this.dataService.getEmployee(id).subscribe(
      data => {
        const responseDate = new Date(data.response.birth);
        responseDate.setDate(responseDate.getDate() + 1);
        this.validateForm.controls['name'].setValue(data.response.name);
        this.validateForm.controls['jobRole'].setValue(data.response.jobRole);
        this.validateForm.controls['salary'].setValue(data.response.salary);
        this.validateForm.controls['employeeRegistration'].setValue(data.response.employeeRegistration);
        this.validateForm.controls['birth'].setValue(responseDate);
        this.validateForm.markAllAsTouched();
      }
    );
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  createForm(): void {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      jobRole: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      employeeRegistration: ['', [Validators.required, Validators.minLength(10)]],
      birth: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this.isOkLoading = true;
    const { name, jobRole, salary, employeeRegistration, birth } = this.validateForm.value;
    if (!this.validateForm.valid) {
      if (this.validateForm.controls['employeeRegistration'].errors['minlength']) {
        this.errorRegistration = 'The minimum length of the registration number is 10';
      } else if (this.validateForm.controls['employeeRegistration'].errors['required']) {
        this.errorRegistration = 'The input Employee registration is required !';
      }
      Object.entries(this.validateForm.controls).
      map(key => {
        this.validateForm.controls[key[0]].markAsDirty();
        this.validateForm.controls[key[0]].updateValueAndValidity();
      });
      this.isOkLoading = false;
    } else {
      const id = this.idToUpdate;
      const birthUpdate = new Date(birth);
      birthUpdate.setDate(birthUpdate.getDate() - 1);
      const employeeRequest: Employee = { id, name, jobRole, salary, employeeRegistration, birth: birthUpdate };
      this.dataService.updateEmployee(employeeRequest).subscribe(
        (response) => {
          this.notificationService.success('Success', 'Employee updated !');
          this.isOkLoading = false;
          this.handleCancel();
          this.onPageIndexChange(this.pageIndex);
        },
        (error) => {
          this.notificationService.error('Error', `${error}`);
          this.isOkLoading = false;
        }
      );
    }
  }

  showDeleteConfirm(id: number, name: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Employee?',
      nzContent: `<b style="color: red;">${name}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteEmployee(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteEmployee(id: number): void {
    this.dataService.deleteEmployee(id).subscribe(
      (response) => {
        this.notificationService.success('Success', 'Employee deleted !');
        this.onPageIndexChange(this.pageIndex);
      },
      (error) => {
        this.notificationService.error('Error', `${error}`);
      }
    );
  }

}
