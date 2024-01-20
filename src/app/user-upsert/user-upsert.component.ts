import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent {
  userForm: FormGroup;
  users!: any[];

  constructor(private route: Router, private userService: UserService, private fb: FormBuilder,) {
    this.userForm = new FormGroup({
      id: new FormControl(Date.now(), Validators.required),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10),]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10),]),
      address: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20),]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])
    });

    this.userService.users.subscribe(users => {
      this.users = users;
    });

    this.userService.selectedUserData.subscribe(user => {
      if (user) {
        this.userForm.patchValue(user);
      }
    });
  }

  addUser() {
    debugger
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      const selectedUser = this.userService.selectedUserSubject.value;

      // Check if the user with the same email already exists
      const userExists = this.users.find(user => user.email === newUser.email);
      if (userExists && !selectedUser) {
        alert('User with the same Email already exists!');
      } else {
        if (selectedUser) {
          // Update user if selected
          this.userService.updateUser(newUser);
        } else {
          // Add new user if not selected
          this.userService.addUser(newUser);
        }
        this.route.navigate(['user']);
        this.userForm.reset();
      }
    }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      return false;
    }
    return true;
  }

  userList() {
    this.route.navigate(['user']);
  }
}
