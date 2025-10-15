export class Duration {
  static seconds(seconds:number):number {
    return seconds * 1000;
  }

  static minutes(minutes:number):number {
    return minutes * 60000;
  }

  static hours(hours:number):number {
    return hours * 60 * 60000;
  }

  static days(days:number):number {
    return days * 24 * 60 * 60000;
  }
}
