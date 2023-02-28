import { Component } from '@angular/core';
import {CustomqueryService} from './customquery.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable, throwError } from 'rxjs';
import { Config } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //title = 'relevance-tune';
  querytext:string = "";
  fraction:number =0;
  partName:string ="";
  value:number = 0;
  initRecords:any[]=[];
  records:any[]=[];
  sqlStatement:string = "";
  partNameRegex = new RegExp("<PartName>(.+?)<\/PartName>");
  partNames = "";
  

  constructor(private http: HttpClient, private customQueryService: CustomqueryService, private config:Config) {
   

   }

   ngOnInit() 
   {

    this.customQueryService.initQuery().
    subscribe((data:any) => 
      {
        this.initRecords = data.records;
        this.sqlStatement = data.details[0].statements[0];
   
        console.log("original sql",this.sqlStatement.replace("\n",""))
        console.log("regex match",this.sqlStatement.match(this.partNameRegex));
      })
      

   }

  sendPostRequest(){
    
    
    this.customQueryService.postQuery(this.querytext,this.fraction,this.partName,this.value).
    subscribe(data=>
      { 

      this.records = data.records;
      console.log("results",this.records)
      console.log(this.partNameRegex)});
 
  }
}
