import { ApiService, ApiConstants } from './../../../../shared/services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  private unsubscribe = new Subject<void>();
  constructor(
    private router: Router) { }

  ngOnInit(): void {
  }

  find() {
    this.router.navigate(['/find'])
  }



}
