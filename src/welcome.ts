export class Welcome {
  public heading = 'Welcome to the Aurelia Navigation App!';

  public relativeTimeDate = new Date();;

  constructor() {
    this.relativeTimeDate.setHours(this.relativeTimeDate.getHours() - 2);
  }
}
