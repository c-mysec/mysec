import { Injectable } from '@angular/core';
//import pbkdf2 from 'crypto-js/pbkdf2';
//import hmacSHA512 from 'crypto-js/hmac-sha512';
//import Base64 from 'crypto-js/enc-base64';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private key? : CryptoJS.lib.WordArray;

  constructor() {
  }

  genSalt() : CryptoJS.lib.WordArray {
    return CryptoJS.lib.WordArray.random(128 / 8);
  }
  getWordArray(s : string) : CryptoJS.lib.WordArray {
    return CryptoJS.enc.Utf8.parse(s);
  }
  getString(w : CryptoJS.lib.WordArray) : string {
    return w.toString();
  }
  genKey(id : string, pass : string, salt : CryptoJS.lib.WordArray) {
    let p1 = id + ':' + pass;
    this.key = CryptoJS.PBKDF2(p1, salt, {
      keySize: 512 / 32,
      iterations: 1000
    });
  }
  encrypt(data : string) : string {
    if (this.key) {
      let encrypted = CryptoJS.AES.encrypt(data, this.key);
      return encrypted.toString();
    }
    return '';
  }
  decrypt(secretData : string) : string {
    if (this.key) {
      var bytes  = CryptoJS.AES.decrypt(secretData, this.key);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText;
    }
    return '';
  }
}



