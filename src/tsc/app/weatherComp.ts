import { Component, Input, Observable, AfterContentInit } from 'angular2/angular2';
import { Http } from 'angular2/http';

declare var io:any;

@Component({
  selector: 'my-weather-cmp',
  template: `<h2>{{city}}</h2><div>Current Temperature: {{temperature | async}} °C</div>`
})
export class WeatherComp implements AfterContentInit{
  @Input() city: string;
  public weather:any;
  public temperature:Observable<string>;

    constructor(public http: Http) {
      const BASE_URL = 'ws://'+location.hostname+':'+location.port;
      this.weather = io(BASE_URL+'/weather');
      this.weather.on('message', (data:any) =>{
      });
    }

    ngAfterContentInit():void {
      this.temperature = Observable.fromEvent(this.weather, this.city);
      //.map((data:any) => data);
    }
}
