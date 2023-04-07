import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user';
import { store } from 'src/app/shared/redux/store';
import { RegisterService } from 'src/app/services/register.service';
import { ActionType } from 'src/app/shared/redux/action-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public user: UserModel;
  public loginForm = { email: '', password: '' };

  constructor(private myRegisterService: RegisterService,private myRouter: Router) { }

  ngOnInit(): void {
    store.subscribe(() => {
      this.user = store.getState().user;
    });

    if (!this.user) {
      this.myRegisterService.autoLogin()
        .subscribe(res => {

          if (res.name === 'JsonWebTokenError') {
            return;
          }

          const action = { type: ActionType.userLogin, payload: res.user };
          store.dispatch(action);
        }, err => alert(err.message));
    }
  }

  public login(): void {
    this.myRegisterService.login(this.loginForm)
      .subscribe(res => {
        if (!res.user) {
          alert('Wrong email / password .');
          return;
        }
        const action = { type: ActionType.userLogin, payload: res.user };
        store.dispatch(action);
        localStorage.setItem('token', res.jwtToken);
        if(res.user.isAdmin === true){
          this.myRouter.navigateByUrl("/admin");
        }
      }, err => alert(err.message));
  }
}
