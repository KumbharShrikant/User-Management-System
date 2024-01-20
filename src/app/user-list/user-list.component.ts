import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users!: any[];
  selectedUser: any;

  constructor(private route: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.userService.selectedUserData.subscribe(user => {
      this.selectedUser = user;
    });
  }

  updateUser(updatedUser: any) {
    this.userService.setSelectedUser(updatedUser);
    this.route.navigate(['upsert']);
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId);
  }

  addNewUser() {
    this.route.navigate(['upsert']);
  }
}
