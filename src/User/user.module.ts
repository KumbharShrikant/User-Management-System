import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpsertComponent } from 'src/app/user-upsert/user-upsert.component';
import { UserListComponent } from 'src/app/user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserUpsertComponent,
    UserListComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UserListComponent },
      { path: 'upsert', component: UserUpsertComponent },
    ])
  ],
  exports: [UserListComponent]
})
export class UserModule { }