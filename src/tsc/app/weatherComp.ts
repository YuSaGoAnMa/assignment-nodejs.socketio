import { Component, Input, Observable, AfterContentInit } from 'angular2/angular2';
import { Http } from 'angular2/http';
import { TemperaturConverterPipe } from './temperatureConverter';

//needed to use socket.io! io is globally known by the browser!
declare var io:any;

//the WeatherComp which shows temperatures for a known city
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
  //get the name of you town
  @Input() city: string;
  //the socket.io connection
  public weather:any;
  //the temperature stream as Observable
  public temperature:Observable<number>;

    //@Input() isn't set yet
    constructor(public http: Http) {
      const BASE_URL = 'ws://'+location.hostname+':'+location.port;
      this.weather = io(BASE_URL+'/weather');
      //log any messages from the message event of socket.io
      this.weather.on('message', (data:any) =>{
        console.log(data);
      });
    }

    //@Input() is set now!
    ngAfterContentInit():void {
      const absolutZero: number = -270.42;
      //add Observable
      this.temperature = Observable.fromEvent(this.weather, this.city).startWith(absolutZero);
    }
}
