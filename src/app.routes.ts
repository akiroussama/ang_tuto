import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { name: 'Welcome', version: '20.0.0' },
    loadComponent: () => import('./features/welcome/welcome.component').then(c => c.WelcomeComponent),
  },
  {
    path: 'signals',
    data: { name: 'Signals', version: '17.0.0' },
    loadComponent: () => import('./features/signals/signals-demo.component').then(c => c.SignalsDemoComponent),
  },
  {
    path: 'control-flow',
    data: { name: 'Built-in Control Flow', version: '17.0.0' },
    loadComponent: () => import('./features/control-flow/control-flow-demo.component').then(c => c.ControlFlowDemoComponent),
  },
  {
    path: 'defer',
    data: { name: 'Deferrable Views', version: '17.0.0' },
    loadComponent: () => import('./features/defer/defer-demo.component').then(c => c.DeferDemoComponent),
  },
  {
    path: 'zoneless',
    data: { name: 'Zoneless', version: '18.0.0' },
    loadComponent: () => import('./features/zoneless/zoneless-demo.component').then(c => c.ZonelessDemoComponent),
  },
  {
    path: 'let',
    data: { name: '@let Declaration', version: '18.0.0' },
    loadComponent: () => import('./features/let/let-demo.component').then(c => c.LetDemoComponent),
  },
  {
    path: 'api-signals',
    data: { name: 'API Signals', version: '17.3.0' },
    loadComponent: () => import('./features/api-signals/api-signals-demo.component').then(c => c.ApiSignalsDemoComponent),
  },
  {
    path: 'hydration',
    data: { name: 'Incremental Hydration', version: '17.0.0' },
    loadComponent: () => import('./features/hydration/hydration-demo.component').then(c => c.HydrationDemoComponent),
  },
  {
    path: 'forms',
    data: { name: 'Signal-based Forms', version: '20.0.0' },
    loadComponent: () => import('./features/forms/forms-demo.component').then(c => c.FormsDemoComponent),
  },
  {
    path: 'native-federation',
    data: { name: 'Native Federation', version: '18.0.0' },
    loadComponent: () => import('./features/native-federation/native-federation-demo.component').then(c => c.NativeFederationDemoComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
];