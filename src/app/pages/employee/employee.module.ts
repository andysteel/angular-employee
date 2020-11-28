import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ListEmployeeComponent } from './list-employee/list-employee.component';

registerLocaleData(pt);

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeeComponent
  ],
  exports: [
    CreateEmployeeComponent,
    ListEmployeeComponent
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfigFunction),
    NzFormModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NzInputModule,
    NzSelectModule,
    NzGridModule,
    NzLayoutModule,
    NzButtonModule,
    NzDatePickerModule,
    NzNotificationModule,
    NzTableModule,
    NzDividerModule,
    NzPaginationModule,
    NzIconModule,
    NzSpaceModule,
    NzModalModule,
    CurrencyMaskModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
