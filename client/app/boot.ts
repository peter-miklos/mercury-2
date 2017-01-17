import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule }          from '@angular/platform-browser';
import { RouterModule }           from '@angular/router';
import { NgModule }               from '@angular/core';

import { AppComponent }           from './app.component';
import { routes }                 from './app.routes';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: []
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
