import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { user } from "../shared/models/user";
import { IUserLogin } from "../shared/interfaces/IUserLogin";
import { HttpClient } from "@angular/common/http";
import { USER_LOGIN_URL } from "src/constants/urs";
import { ToastrService } from "ngx-toastr";

const USER_KEY = 'user';
@Injectable({
    providedIn:'root'
})
export class UserService {
    private userSubject = new BehaviorSubject<user>(this.getUserFromLocalStorage());
    public userObservable:Observable<user>;
    constructor(private http:HttpClient, private toastrService:ToastrService){
        this.userObservable = this.userSubject.asObservable();
    }

    login(userLogin:IUserLogin):Observable<user>{
        return this.http.post<user>(USER_LOGIN_URL, userLogin).pipe(
            tap({
                next: (user) =>{
                    this.setUserToLocalStorage(user);
                    this.userSubject.next(user);
                    this.toastrService.success(
                        `Welcome to Funiture ${user.username}!`,
                        'Login Successful'
                    )
                },
                error: (errorReponse) =>{
                    this.toastrService.error(errorReponse.error, 'Login Failed');
                }
            })
        );
    }

    logout(){
        this.userSubject.next(new user());
        localStorage.removeItem(USER_KEY);
        window.location.reload();
    }
    private setUserToLocalStorage(user:user){
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    private getUserFromLocalStorage():user{
        const userJson = localStorage.getItem(USER_KEY);
        if(userJson) return JSON.parse(userJson) as user;
        return new user();
    }
}