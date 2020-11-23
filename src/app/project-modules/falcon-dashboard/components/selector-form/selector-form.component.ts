import { IVehicles } from './../../../../shared/interface/ivehicles';
import { IPlanet } from './../../../../shared/interface/iplanet';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-selector-form',
  templateUrl: './selector-form.component.html',
  styleUrls: ['./selector-form.component.scss']
})
export class SelectorFormComponent implements OnInit, OnChanges {

  @Input()
  planets: any[];

  @Input()
  vehicles: IVehicles[];

  @Input()
  reset: boolean;

  @Output()
  selectedDestination = new EventEmitter<any>();
  formGroup: FormGroup;
  filteredOptions: Observable<any[]>;
  availableVehicles: IVehicles[];
  selectedPlanet: any;
  selectedVehicle: any;
  filteredVehicles: IVehicles[];


  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      planet: [null],
      vehicle: [null],
      timeTaken: [null]
    })
  }

  ngOnChanges(): void {
    if (this.reset) this.resetValue();
    this.init();
  }

  ngOnInit(): void {

  }

  init() {
    this.filteredOptions = this.formGroup.get('planet').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.filteredVehicles = this.vehicles;
  }

  resetValue() {
    this.formGroup.setValue({
      planet: null,
      vehicle: null,
      timeTaken: null
    });
    this.selectedPlanet = null;
    this.selectedVehicle = null;
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private _filter(value: string): any[] {
    debugger
    const filterValue = this._normalizeValue(value);

    return this.planets.filter(planet => this._normalizeValue(planet.name).includes(filterValue));
  }

  selectPlanet(planet) {
    this.selectedPlanet = planet;
    this.availableVehicles = this.vehicles.filter(vehicle => (vehicle.max_distance >= planet.distance) && (vehicle.total_no > 0));
    this.calculateTimeTaken();
    this.emitSelectedDestination(this.formGroup.value);
  }

  selectVehicle(vehicle) {
    if (vehicle.total_no == 0) return;
    this.selectedVehicle = vehicle;
    this.formGroup.patchValue({
      vehicle: vehicle.name
    });
    this.calculateTimeTaken();
    this.emitSelectedDestination(this.formGroup.value);
  }

  // calculate time taken to travel per destination
  calculateTimeTaken() {
    if (this.formGroup.value.planet && this.formGroup.value.vehicle) {
      this.formGroup.patchValue({
        timeTaken: this.selectedPlanet.distance / this.selectedVehicle.speed
      })
    }
  }

  emitSelectedDestination(selectedDest: any): void {
    this.selectedDestination.emit(selectedDest);
  }

}
