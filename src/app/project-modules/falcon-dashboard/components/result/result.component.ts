import { UtilityService } from './../../../../shared/services/utility.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  result: any;

  constructor(private UtilityService: UtilityService) {
    this.UtilityService.result.subscribe(res => {
      this.result = res;
    })
  }

  ngOnInit(): void {
  }

}
