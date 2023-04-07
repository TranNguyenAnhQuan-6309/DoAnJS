import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user';
import { store } from 'src/app/shared/redux/store';
import { RegisterService } from 'src/app/services/register.service';
import { ActionType } from 'src/app/shared/redux/action-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  public user: UserModel;
  constructor(private myRegisterService: RegisterService,private myRouter: Router) { }
  ngOnInit(): void {
  }
  public logout(): void {
    const action = { type: ActionType.userLogin, payload: '' };
    store.dispatch(action);
    store.dispatch({ type: ActionType.updateUserActive, payload:false });
    localStorage.removeItem('token');
    this.myRouter.navigateByUrl("/");
  }
}
