import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config';

@Injectable({
  providedIn: 'root',
})
export class CustomqueryService {
  constructor(private http: HttpClient, private config: Config) {}

  getPartNames(queryText: string): Observable<any> {
    const apiUrl = this.config.dataset_url;
    const requestBody = {
      user: this.config.username,
      password: this.config.password,
      parameters: {
        param1: queryText,
      },
    };

    return this.http.post(apiUrl, requestBody);
  }

  postQuery(
    querytext: string,
    fraction: number,
    partName: string,
    value: number,
    operator: string,
    partNameWeights: { partName: string; partWeight: string }[],
    relevanceTransformsPayload: string
  ): Observable<any> {
    let textPartWeights = '';
    for (const row of partNameWeights) {
      if (row.partName && row.partWeight) {
        textPartWeights += `${row.partName}:${row.partWeight},`;
      }
    }
    if (textPartWeights) {
      textPartWeights = textPartWeights.slice(0, -1); // Remove the trailing comma
    }

    return this.http.post<any>(this.config.api_url + 'search.query', {
      app: this.config.app_name,
      query: {
        name: this.config.query_webservice_name,
        action: 'search',
        text: querytext,
        page: 1,
        pageSize: 10,
        relevanceTransforms: relevanceTransformsPayload,
        textPartWeights,
      },
      user: this.config.username,
      password: this.config.password,
    });
  }
}
