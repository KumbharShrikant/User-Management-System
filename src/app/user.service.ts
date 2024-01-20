import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService {
    private usersSubject = new BehaviorSubject<any[]>([]);
    users = this.usersSubject.asObservable();

    public selectedUserSubject = new BehaviorSubject<any>(null);
    selectedUserData = this.selectedUserSubject.asObservable();

    constructor() { }

    getUsers(): Observable<any[]> {
        return this.users;
    }

    addUser(user: any) {
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next([...currentUsers, user]);
    }

    updateUser(updatedUser: any) {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        );
        this.usersSubject.next(updatedUsers);
        this.selectedUserSubject.next(null); // Clear selected user after update
    }

    deleteUser(userId: number) {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.filter(user => user.id !== userId);
        this.usersSubject.next(updatedUsers);
    }

    setSelectedUser(user: any) {
        this.selectedUserSubject.next(user);
    }
}