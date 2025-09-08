import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: 'payments/a8b173c6-affd-4ade-a536-7655b3b4709f', pathMatch: 'full' },
  { path: 'payments/:batchId', component: AppComponent },
];

