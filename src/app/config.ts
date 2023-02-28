import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {
  api_url: string = 'http://72.249.144.188//api/v1/';
  app_name: string = 'PharmaApp';
  username: string = 'shravan';
  password: string = 'Shravan1123';
  query_webservice_name = 'pharma_query';
}
