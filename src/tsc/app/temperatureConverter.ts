import { Component, Pipe, PipeTransform } from 'angular2/angular2';

//this is a pipe which one can use in a template
//this pipe transforms number representing a Celsius temperatur to Fahrenheit or Kelvin
@Pipe({
  name: 'temperaturConverter'
})
export class TemperaturConverterPipe implements PipeTransform {
  transform(value: number, args: any[]) {
    //if it should be Celsius
    var places:number = args[1];
    if(value && !isNaN(value) && args[0] === 'C') {
      return value + ' °C';
    }
    //if it should be Fahrenheit
    if(value && !isNaN(value) && args[0] === 'F') {
      return ((value / 9 *5)+ 32).toFixed(places) + ' °F' ;
    }
    //if it should be Kelvin
    if(value && !isNaN(value) && args[0] === 'K') {
      return (273.15 + Number(value)).toFixed(places) + ' K';
    }
    //fallback! just return
    return;
  }
}
