import { Device } from './device';
export interface  User {
  username: string;
  password: string;
  endpoint: string;
  cloud: string;
  devices: Device[];
}