import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    NzModalModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzTabsModule,
    NzTableModule,
    NzSelectModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzDatePickerModule,
    DragDropModule,
    NzToolTipModule,
    NzUploadModule,
    NzNotificationModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    NzModalModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzTabsModule,
    NzTableModule,
    NzSelectModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzDatePickerModule,
    DragDropModule,
    NzToolTipModule,
    NzUploadModule,
    NzNotificationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule { }
