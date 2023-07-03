import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RelevanceCheckerComponent } from './relevance-checker/relevance-checker.component';
import { FormsModule } from '@angular/forms';
import { Config } from './config';

@NgModule({
  declarations: [AppComponent, RelevanceCheckerComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [Config],
  bootstrap: [AppComponent],
})
export class AppModule {}
