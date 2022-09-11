import { SwitchItem } from './switch-item';
import { DeviceItem } from './device-item';
import { PagtoItem } from './pagto-item';
export interface UserItem {
    name: string;
    alexaAccessToken?: string;
    alexaRefreshToken?: string;
    email: string;
    password?: string;
    url?: string; // não é mais usado
    devices?: DeviceItem[];
    switches?: SwitchItem[];
    Authorization?: string;
    // when payment is done, add credit and then add licenses to device
    credit: number;
    pagtos?: PagtoItem[];
}
