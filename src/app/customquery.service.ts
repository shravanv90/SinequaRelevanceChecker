import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class CustomqueryService {

 
  
  constructor(private http:HttpClient, private config:Config) { }

  initQuery(){

    return this.http.post(this.config.api_url+"search.query",
    {  
      app: this.config.app_name,
      query: {
        name: this.config.query_webservice_name,
        action: "search",
        text: "test",
        page: 1,
        pageSize: 2,
        
      },
      user:this.config.username,
      password:this.config.password
    })
  }
  
  //postQuery(partName:string,boostScore:number,fraction:number,searchQuery:string)
  postQuery(querytext:string,fraction:number,partName:string,value:number):Observable<any> 
  {
    console.log("inside post query service");
    return this.http.post(this.config.api_url+"search.query",
    {  
      app: this.config.app_name,
      query: {
        name: this.config.query_webservice_name,
        action: "search",
        text: querytext,
        page: 1,
        pageSize: 10,
        relevanceTransforms:`<RelevanceTransforms>
                                <PartNameBoost fraction=${fraction}>
                                  <PartNames mode="and">
                                    <PartName>${partName}</PartName>
                                 </PartNames>
                                <Action op="mul" value="${value}"></Action>
                                </PartNameBoost>`,
        
      },
      user:this.config.username,
      password:this.config.password
    })
    
      
  }
}
function data(data: any) {
  throw new Error('Function not implemented.');
}

