import { Component, OnInit } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import jwt_decode from "jwt-decode";
import { JwtObject } from '../common/jwt-object'
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
  connectedCloud : boolean;
  loginOrRegister : boolean;
  isLoading: boolean = false;
  username: string = "";
  password: string = "";

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });
  signupForm = this.formBuilder.group({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  constructor(private formBuilder: FormBuilder) {
    this.connectedCloud = false;
    this.loginOrRegister = true;
    this.identified = false;
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
      let decoded : JwtObject = jwt_decode(idToken ?? '');
      console.log(decoded);
      sessionStorage.setItem('idTokenDecoded', JSON.stringify(decoded));
      sessionStorage.setItem('cognito:groups', JSON.stringify(decoded['cognito:groups']));
      sessionStorage.setItem('cognito:name', decoded['name']);
      sessionStorage.setItem('cognito:email', decoded['email']);
    }
    // abre idtoken
    // verifica se o usuário está cadastrado no dynamo
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
  onSignIn(){
    if (this.loginForm.valid) {
      this.isLoading = true;
      let authenticationDetails = new AuthenticationDetails({
          Username: this.username,
          Password: this.password,
      });
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      };

      let userPool = new CognitoUserPool(poolData);
      let userData = { Username: this.loginForm.controls.username.value ?? '', Pool: userPool };
      let cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log('ok: ' + result);
          this.isLoading = false;
          this.connectedCloud = true;
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
        },
      });
    }
  }
  onSignup(){
    if (this.signupForm.valid) {
     this.isLoading = true;
     let poolData = {
       UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
       ClientId: environment.cognitoAppClientId // Your client id here
     };
     let userPool = new CognitoUserPool(poolData);
     let attributeList = [];
     let formData:formDataInterface = {
       "name": this.signupForm.controls.username.value ?? '',
       "email": this.signupForm.controls.email.value ?? '',
       "password": this.signupForm.controls.password.value ?? ''
     }

     for (let key in formData) {
       let attrData = {
         Name: key,
         Value: formData[key]
       }
       let attribute = new CognitoUserAttribute(attrData);
       attributeList.push(attribute)
     }
     userPool.signUp(this.signupForm.controls.username.value ?? '', this.signupForm.controls.password.value ?? '', attributeList, [], (
       err,
       result
     ) => {
       this.isLoading = false;
       if (err) {
         alert(err.message || JSON.stringify(err));
         return;
       }
       console.log('ok');
     });
    }
 }
}
