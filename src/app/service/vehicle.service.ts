import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from '../model/vehicle';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  constructor(private http: HttpClient) { }

  private urlApi = 'http://localhost:8080/api/vehicles' 

  public findAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.urlApi}/findAllVehicles`, {
        headers: new HttpHeaders().set('Type-content', 'aplication/json')
    });
  }

  public updateVehicle (vehicle: Vehicle): Observable<{}>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(vehicle);
    console.log(body)
    return this.http.post(`${this.urlApi}/updateVehicle`, body,{'headers':headers})
  }

  public nuevoVehicle (vehicle: Vehicle): Observable<{}>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(vehicle);
    console.log(body)
    return this.http.post(`${this.urlApi}/createVehicle`, body,{'headers':headers})
  }

  public deleteVehicle (idVehicle: number): Observable<{}>{
    return this.http.delete(`${this.urlApi}/deleteVehicles/${idVehicle}`, {
      headers: new HttpHeaders().set('Type-content', 'aplication/json')
    });
  }
}