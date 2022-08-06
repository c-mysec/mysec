import { Control } from './control';
export interface Device {
  name: string;
  password: string;
  topic: string;
  controls: Control[];
}