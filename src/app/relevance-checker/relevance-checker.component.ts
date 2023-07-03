import { Component } from '@angular/core';
import { CustomqueryService } from '../customquery.service';

@Component({
  selector: 'app-relevance-checker',
  templateUrl: './relevance-checker.component.html',
  styleUrls: ['./relevance-checker.component.css'],
})
export class RelevanceCheckerComponent {
  querytext: string = '';
  fraction: number = 0;
  partName: string = '';
  value: number = 0;
  records: any[] = [];

  constructor(private customQueryService: CustomqueryService) {}

  sendPostRequest() {
    this.customQueryService
      .postQuery(this.querytext, this.fraction, this.partName, this.value)
      .subscribe((data: any) => {
        this.records = data.records;
      });
  }
}
