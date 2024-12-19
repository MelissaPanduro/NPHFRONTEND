import { Routes } from '@angular/router';

export const routes: Routes = [

  // Dashboard General
  {
    path: 'Dashboard',
    title: 'Dashboard General',
    loadComponent: () =>
      import('./dashboard/pages/dashboard/dashboard.component'),
  },

  // Modulo Galpon
  {
    path: 'Modulo-Galpon',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: 'Masters',
        title: 'Maestros Galpon',
        loadComponent: () =>
          import('./dashboard/pages/masters/defer-options/defer-options.component'),
      },
      {
        path: 'Tema',
        title: 'Maestros Food',
        loadComponent: () =>
          import('./dashboard/pages/masters/defer-options/defer-options.component'),
      },
    ],
  },

    // Modulo Bienestar Comun
  {
    path: 'Modulo-Bienestar-Comun',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: '',
        redirectTo: 'Dashboard',
        pathMatch: 'full',
      },
      {
        path: 'Dashboard',
        title: 'Dashboard Bienestar',
        loadComponent: () =>
          import('./dashboard/pages/dashboard/dashboard.component'),
      },
      {
        path: 'Masters',
        title: 'Maestros Bienestar',
        loadComponent: () =>
          import('./dashboard/pages/masters/masters.component'),
      },
    ],
  },

  // Modulo Psicologia
  {
    path: 'Modulo-Psicologia',
    title: 'Modulo Psicologia',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: '',
        redirectTo: 'Dashboard',
        pathMatch: 'full',
      },
      {
        path: 'Dashboard',
        title: 'Dashboard Psicologia',
        loadComponent: () =>
          import('./dashboard/pages/dashboard/dashboard.component'),
      },
      {
        path: 'Masters',
        title: 'Maestros Psicologia',
        loadComponent: () =>
          import('./dashboard/pages/masters/defer-options/defer-options.component'),
      },
      {
        path: 'Masters',
        title: 'Maestros Psicologia',
        loadComponent: () =>
          import('./dashboard/pages/masters/defer-options/defer-options.component'),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'Modulo-Galpon',
    pathMatch: 'full',
  },
];
