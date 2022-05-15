import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Vehicle } from '../../model/vehicle';

import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-dialogoVehicle',
  templateUrl: './dialogoInformationVehicle.component.html',
  styleUrls: ['./dialogoInformationVehicle.component.css']
})
export class DialogoInformationVehicleComponent {
  
  constructor(
    private vehicleService: VehicleService,
    public dialogRef: MatDialogRef<DialogoInformationVehicleComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Vehicle) {
    }

  cerrar() {
    this.dialogRef.close();
  }

  updateVehicle(vehicle: Vehicle) {
    this.vehicleService.updateVehicle(vehicle).subscribe(() => {
      this.cerrar();
    });
  }

  nuevoVehicle(vehicle: Vehicle) {
    this.vehicleService.nuevoVehicle(vehicle).subscribe(() => {
      this.cerrar();
    });
  }

}