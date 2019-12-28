import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    public baseURL: string = "https://HousePredictionSystem.goldenstriker.repl.co";
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