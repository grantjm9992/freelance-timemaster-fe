import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Utils {
    public getTimeString(timeObject: any, seconds: boolean = false): string {
        let string = `${this.pad(timeObject.hour)}:${this.pad(timeObject.minute)}`;
        if (seconds) {
            string += `:${this.pad(timeObject.second)}`;
        }
        return string;
    }

    public getDateString(dateObject: any): string {
        return `${dateObject.year}-${this.pad(dateObject.month)}-${this.pad(dateObject.day)}`;
    }

    public pad(num:number, size: number = 2): string {
        let s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }
}
