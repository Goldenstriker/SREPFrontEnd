import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import {SiteURL} from '../constants';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    public baseURL: string = SiteURL;
    getAll() {
        return this.http.get<User[]>(this.baseURL+`/users/`);
    }

    register(user: User) {
        return this.http.post(this.baseURL+`/register/`, user);
    }

    delete(id: number) {
        return this.http.delete(this.baseURL+`/users/${id}`);
    }

    getCurrentLoggedIn(){
        return this.http.get<User>(this.baseURL+`/current_user/`);
    }
}