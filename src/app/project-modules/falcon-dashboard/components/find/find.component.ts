import { UtilityService } from './../../../../shared/services/utility.service';
import { Router } from '@angular/router';
import { IVehicles } from './../../../../shared/interface/ivehicles';
import { IPlanet } from './../../../../shared/interface/iplanet';
import { ApiService, ApiConstants } from './../../../../shared/services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();
  token: string;
  planets: IPlanet[] = [];
  vehicles: IVehicles[] = [];
  planetList: string[] = [];
  vehicleList: string[] = [];
  timeList: number[] = [];
  copyOfPlanet: IPlanet[] = [];
  copyOfVehicles: string;
  reset = false;
  totalTime: number = 0;

  constructor(private apiService: ApiService,
    private router: Router,
    private utilityService: UtilityService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getToken();
    this.getVehicles();
    this.getPlanets();
  }

  getToken() {
    this.apiService
      .ExecutePost(
        this.apiService.baseUrl + ApiConstants.getToken, null
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          this.token = response.token;
        },
        (error: any) => {
          console.log("error=>", error);

        }
      );
  }

  getVehicles() {
    this.apiService
      .ExecuteGet(
        this.apiService.baseUrl + ApiConstants.getVehicles, null
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          this.vehicles = response;
          this.copyOfVehicles = JSON.stringify(response);
        },
        (error: any) => {
          console.log("error=>", error);
        }
      );
  }

  getPlanets() {
    this.apiService
      .ExecuteGet(
        this.apiService.baseUrl + ApiConstants.getPlanets, null
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          this.planets = response;
          this.copyOfPlanet = [...response];
        },
        (error: any) => {
          console.log("error=>", error);
        }
      );
  }

  // planet, vehicle, timetaken to travel by each destination
  selectedDestination(selectedDestination: any, index): void {
    console.log("selected Destination =>$index", selectedDestination);
    this.planetList[index] = selectedDestination.planet;
    this.vehicleList[index] = selectedDestination.vehicle;
    this.timeList[index] = selectedDestination.timeTaken;
    this.removeSelectedPlanets();
    this.removeSelectedVehicles();
    this.calcuteTotalTime();
  }

  // clear selected planet
  removeSelectedPlanets() {
    this.planets = this.copyOfPlanet.filter(cp => {
      if (this.planetList.every(pl => pl != cp.name)) return cp;
    })
    console.log("new planet list=>", this.planets);
  }

  // update vehicle count
  removeSelectedVehicles() {
    let copy = JSON.parse(this.copyOfVehicles)
    this.vehicles.forEach((v, i) => {
      v.total_no = copy[i].total_no - this.getOccurrence(this.vehicleList, v.name);
    })

    console.log("new vehicle list=>", this.vehicles);
  }

  // find total time taken to travel for each destination
  calcuteTotalTime() {
    this.totalTime = 0;
    this.timeList.forEach(time =>
      this.totalTime += time)
  }

  // find the occurance count of an element from array
  getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
  }

  // find falcon api integration
  findFalcon() {
    let data = {
      token: this.token,
      planet_names: this.planetList,
      vehicle_names: this.vehicleList
    }
    this.apiService
      .ExecutePost(
        this.apiService.baseUrl + ApiConstants.findFalcon, data
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: any) => {
          response.timeTaken = this.totalTime;
          this.utilityService.setResult(response);
          this.router.navigate(['result']);
        },
        (error: any) => {
          console.log("error=>", error);
          this._snackBar.open(error.error.error, 'OK', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
  }

  // reset value
  resetGroup() {
    this.reset = true;
    this.planetList = [];
    this.vehicleList = [];
    this.timeList = [];
    this.removeSelectedPlanets();
    this.removeSelectedVehicles();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


}
