import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    NzGridModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
