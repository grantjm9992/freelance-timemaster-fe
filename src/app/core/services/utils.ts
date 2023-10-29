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

    public getDateFromString(dateTimeString: string): any {
        const obj = this.getDateTimeFromString(dateTimeString);
        return obj.date;
    }

    public getTimeFromString(dateTimeString: string): any {
        const obj = this.getDateTimeFromString(dateTimeString);
        return obj.time;
    }

    public getDateTimeFromString(dateTimeString: string): any {
        const dateTimePattern = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
        const matches = dateTimeString.match(dateTimePattern);
        if (matches) {
            // Extract the matched components
            const [, year, month, day, hour, minute, second] = matches;

            // Convert the matched components to numbers
            const yearNum = parseInt(year, 10);
            const monthNum = parseInt(month, 10);
            const dayNum = parseInt(day, 10);
            const hourNum = parseInt(hour, 10);
            const minuteNum = parseInt(minute, 10);
            const secondNum = parseInt(second, 10);

            // Create objects for date and time components
            const date = { year: yearNum, month: monthNum, day: dayNum };
            const time = { hour: hourNum, minute: minuteNum, second: secondNum };
            return {
                date: date,
                time: time
            }
        } else {
            console.error("Invalid datetime string format");
            return {date: null, time: null};
        }
    }


    public pad(num:number, size: number = 2): string {
        let s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }
}
