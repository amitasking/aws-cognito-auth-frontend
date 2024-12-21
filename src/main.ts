import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import * as global from 'global';

(window as any).global = global;

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
