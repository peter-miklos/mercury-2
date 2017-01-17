/// <reference path="../node_modules/@types/node/index.d.ts" />

import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div>
    <router-outlet></router-outlet>
  </div>
  `,
})
export class AppComponent {}
