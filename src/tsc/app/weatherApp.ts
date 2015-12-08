import { Component } from 'angular2/angular2';
import { Http } from 'angular2/http';
import { WeatherComp } from './weatherComp';


//Lists all towns we are listening to
@Component({
  selector: 'my-weather-app',
  directives: [ WeatherComp ],
  template: `
  <h1>The Angular2 Realtime Weather App</h1>
  <div>
    <span class="label">New City</span>
    <select #newCity>
      <option *ng-for="#city of possibleCities" [value]="city">{{city}}</option>
    </select>
    <button (click)="addCity(newCity.value)">Add City</button>
  </div>
  <div>
    <my-weather-cmp *ng-for="#city of cities" [city]="city">
    </my-weather-cmp>
  </div>
`
})
export class WeatherApp{
  //some hardcoded initial values. One could do this better but it's not necessary for a show case
  possibleCities:string[] = ["Aachen", "Berlin", "SHARKTOWN"];
  cities:string[] = ["Aachen"];

    //adds new City to the list
    addCity(city:string):void {
      this.cities.push(city);
    }
}
