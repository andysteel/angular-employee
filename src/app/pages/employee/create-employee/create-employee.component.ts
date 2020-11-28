import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EmployeeInsertRequest } from 'src/app/pages/employee/request/employee.request';
import { EmployeeDataService } from 'src/app/shared/employee.data.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',

  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {

  validateForm!: FormGroup;
  errorRegistration: string;

  constructor(
    private fb: FormBuilder,
    private notificationService: NzNotificationService,
    private dataService: EmployeeDataService) {}

  ngOnInit(): void {
    this.createForm();
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
    const { name, jobRole, salary, employeeRegistration, birth } = this.validateForm.value;
    if (!this.validateForm.valid) {
      if (this.validateForm.controls['employeeRegistration'].errors['minlength']) {
        this.errorRegistration = 'The minimum length of the registration number is 10';
      } else if (this.validateForm.controls['employeeRegistration'].errors['required']) {
        this.errorRegistration = 'The input Employee registration is required !';
      }
      Object.entries(this.validateForm.controls)
      .map(key => {
        this.validateForm.controls[key[0]].markAsDirty();
        this.validateForm.controls[key[0]].updateValueAndValidity();
      });
    } else {
      const birthUpdate = new Date(birth);
      birthUpdate.setDate(birthUpdate.getDate() - 1);
      const employeeRequest: EmployeeInsertRequest = { name, jobRole, salary, employeeRegistration, birth: birthUpdate};
      this.dataService.createEmployee(employeeRequest).subscribe(
        (response) => {
          this.notificationService.success('Success', 'Employee created !');
          this.createForm();
        },
        (error) => this.notificationService.error('Error', `${error}`),
      );
    }
  }

  ngOnDestroy(): void {

  }

}
