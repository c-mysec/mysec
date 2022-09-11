import { Component, OnInit } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { CloudSessionService } from '../services/cloud-session.service';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { JwtObject } from '../common/jwt-object'
import { UserItem } from '../common/user-item';
import { LocaldataService } from '../services/localdata.service';
interface formDataInterface {
  "name": string;
  "email": string;
  "password": string;
  [key: string]: string;
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  identified : boolean;
  isLoading: boolean = false;
  user? : UserItem;
  subscription: Subscription;
  constructor(private formBuilder: FormBuilder, private cloudSessionService : CloudSessionService, private http: HttpClient,
    private localService : LocaldataService) {
    this.identified = false;
    this.subscription = this.cloudSessionService.getObservable().subscribe(message => this.identified = message != 'disc');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    let qs = window.location.href;
    qs = qs.substring(qs.indexOf('#')+1);
    let idToken = this.getHashQueryVariable(qs, 'id_token');
    let accessToken = this.getHashQueryVariable(qs, 'access_token');
    let expiresIn = this.getHashQueryVariable(qs, 'expires_in');
    this.identified = (!idToken) ? false : true;
    if (!this.identified) {
      idToken = sessionStorage.getItem('idToken') ?? '';
      this.identified = (idToken) ? true : false;
    } else {
      sessionStorage.setItem('idToken', idToken ?? '');
      sessionStorage.setItem('accessToken', accessToken ?? '');
      sessionStorage.setItem('expiresIn', expiresIn ?? '');
    }
    if (this.identified) {
      // abre idtoken
      let decoded : JwtObject = jwt_decode(idToken ?? '');
      console.log(decoded);
      // verifica se o usuário está cadastrado no dynamo
      this.http.get('http://localhost:3000/GetUser').subscribe(user =>
      {
        this.user = user as UserItem;
        console.log(JSON.stringify(user));
        this.localService.setUser(this.user);
      });
      sessionStorage.setItem('idTokenDecoded', JSON.stringify(decoded));
      sessionStorage.setItem('cognito:groups', JSON.stringify(decoded['cognito:groups']));
      sessionStorage.setItem('cognito:name', decoded['name']);
      sessionStorage.setItem('cognito:email', decoded['email']);
    }

  }
  redir() {
    window.location.href = "https://mysec.auth.us-east-1.amazoncognito.com/login?client_id=7dgbavibjnk28vd0vrustcbo6b&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:4200/";
  }
  getHashQueryVariable(query : string, variable : string) {
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return undefined;
  }
}
