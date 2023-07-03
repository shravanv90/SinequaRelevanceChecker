import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config';

@Injectable({
  providedIn: 'root',
})
export class CustomqueryService {
  constructor(private http: HttpClient, private config: Config) {}

  postQuery(
    querytext: string,
    fraction: number,
    partName: string,
    value: number,
    operator: string
  ): Observable<any> {
    const relevanceTransforms = `
      <RelevanceTransforms>
        <PartNameBoost fraction="${fraction}">
          <PartNames mode="and">
            <PartName>${partName}</PartName>
          </PartNames>
          <Action op="${operator}" value="${value}"></Action>
        </PartNameBoost>
      </RelevanceTransforms>
    `;

    const requestBody = {
      app: this.config.app_name,
      query: {
        name: this.config.query_webservice_name,
        action: 'search',
        text: querytext,
        page: 1,
        pageSize: 10,
        relevanceTransforms: relevanceTransforms,
      },
      user: this.config.username,
      password: this.config.password,
    };

    console.log('inside post query service');
    return this.http.post<any>(
      this.config.api_url + 'search.query',
      requestBody
    );
  }
}
