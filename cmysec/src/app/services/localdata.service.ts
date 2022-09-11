import { Injectable } from '@angular/core';
import { UserItem } from '../common/user-item';
import { CryptoService } from './crypto.service';
@Injectable({
  providedIn: 'root'
})
export class LocaldataService {
  private user : UserItem;
  private salt : CryptoJS.lib.WordArray;
  private connected : boolean; // connected to cloud
  private localDevices : Map<string, boolean>; // for each device name, show if we can contact it
  constructor(private crypto : CryptoService) {
    let s = localStorage.getItem('userdata');
    let ssalt = localStorage.getItem('usersalt');
    if (s && ssalt) {
      this.salt = this.crypto.getWordArray(ssalt);
      let u = this.crypto.decrypt(s);
      this.user = JSON.parse(u);
    } else {
      this.user = {
        name : '',
        devices: [],
        email: '',
        credit: 0
      };
      this.salt = this.crypto.genSalt();
      let ssalt = this.crypto.getString(this.salt);
      localStorage.setItem('usersalt', ssalt);
    }
    this.connected = false;
    this.localDevices = new Map();
}
  getUser() : UserItem {
    return this.user;
  }
  setUser(u : UserItem) {
    let e = this.crypto.encrypt(JSON.stringify(u));
    localStorage.setItem('userdata', e);
  }
  isConnected() : boolean {
    return this.connected;
  }
  setConnected() {
    this.connected = true;
  }
  isLocal(deviceName : string) : boolean {
    let a = this.localDevices.get(deviceName);
    return a ?? false;
  }
}
