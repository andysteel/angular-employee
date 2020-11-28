import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDataService } from './employee.data.service';
import { RegistrationPipe } from './pipe/registration.pipe';

@NgModule({
  declarations: [
    RegistrationPipe
  ],
  exports: [
    RegistrationPipe
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    EmployeeDataService
  ]
})
export class SharedModule { }
