import { SwitchItem } from './switch-item';

export interface DeviceItem {
    name: string;
    switches: SwitchItem[];
    // this is set when exchanging cert via mqtt and tempCert = true and cloudExpirationDate is null or undefined or zero
    cloudExpirationDate?: number;   // Date.getTime - number of milliseconds since January 1, 1970, 00:00:00 UTC
                                    // null or Zero -> no subscripton
    certificateArn?: string;
    password? : string;
    tempCert? : boolean;
    clientId? : string;
}
