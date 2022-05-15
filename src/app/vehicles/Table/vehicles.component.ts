import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogoInformationVehicleComponent } from '../Dialog/DialogoInformationVehicleComponent'

import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Vehicle } from '../../model/vehicle';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent implements OnInit {

  clickedRows = new Set<Vehicle>();
  columnas: string[] = ['codigo', 'nombre', 'velocidadMaxima', 'tipoVehiculo', 'botonDelete'];
  dataSource: any;

  filtro: String;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private vehicleService: VehicleService) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles(): void {
    this.vehicleService.findAll().subscribe((resp: any) =>
      this.prepareDataSourceTable(resp)
    );
  }

  private prepareDataSourceTable(resp: any) {
    this.dataSource = new MatTableDataSource<Vehicle>(resp)
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter()
  }

  private createFilter(): any {
    return function (data: any, filter: string): boolean {
      return data.tipoVehiculo.toLowerCase().includes(filter);
    };
  }

  applyFilter() {
    this.dataSource.filter = this.filtro;
    this.dataSource.applyFilter;
  }

  abrirDialogoNuevos() {
    const dialogoNuevos = this.dialog.open(DialogoInformationVehicleComponent, {
      data: new Object()
    });
    dialogoNuevos.afterClosed().subscribe(() => {
      this.getAllVehicles()
    });
  }

  abrirDialogo(vehicle: Vehicle) {
    const dialogoUpdate = this.dialog.open(DialogoInformationVehicleComponent, {
      data: vehicle
    });
  }

  deleteVehicle(vehicle: Vehicle) {
    this.vehicleService.deleteVehicle(vehicle.codigo).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (v: Vehicle) => v.codigo != vehicle.codigo
      );
    });
  }

}



