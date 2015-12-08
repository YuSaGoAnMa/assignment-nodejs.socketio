import { Component, Input, Observable, AfterContentInit } from 'angular2/angular2';
import { Http } from 'angular2/http';
import { TemperaturConverterPipe } from './temperatureConverter';

declare var io:any;

@Component({
  selector: 'my-weather-cmp',
  pipes: [ TemperaturConverterPipe ],
  template: `
  <h2>{{city}}</h2>
  <div>Current Temperatures:</div>
  <div>[Celsius]: {{temperature | async | temperaturConverter:'C' }}</div>
  <div>[Fahrenheit]: {{temperature | async | temperaturConverter:'F':2 }}</div>
  <div>[Kelvin]: {{temperature | async | temperaturConverter:'K':2 }}</div>
  `
})
export class WeatherComp implements AfterContentInit{
  @Input() city: string;
  public weather:any;
  public temperature:Observable<number>;

    constructor(public http: Http) {
      const BASE_URL = 'ws://'+location.hostname+':'+location.port;
      this.weather = io(BASE_URL+'/weather');
      this.weather.on('message', (data:any) =>{
      });
    }

    ngAfterContentInit():void {
      const absolutZero: number = -270.42;
      this.temperature = Observable.fromEvent(this.weather, this.city).startWith(absolutZero);
    }
}
