import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Menú principal con estructura jerárquica
const MENU_ITEMS = [

  // Dashboard General
  {
    title: 'Dashboard',
    path: '/Modulo-Galpon',
    icon: 'dashboard',
  },

  // Modulo Galpon
  {
    title: 'Modulo Galpon',
    path: '/Modulo-Galpon',
    children: [
      {
        title: 'Maestros',
        path: '/Modulo-Galpon/Masters',
        children: [
          {
            title: 'Producto',
            path: '/Modulo-Galpon/Masters',
            children: [
              { title: 'Producto Activos', path: '/Modulo-Galpon/Tema' },
            ],
          },
          {
            title: 'Proveedor',
            children: [
              { title: 'Proveedor Activos', path: '/Modulo-Galpon/Proveedor' },
            ],
          },
        ],
      },
      { title: 'Estadísticas', path: '/Modulo-Galpon/Estadisticas' },
    ],
  },

  // Modulo Bienestar Comun
  {
    title: 'Modulo Bienestar Comun',
    path: '/Modulo-Bienestar-Comun',
    children: [
      { title: 'Dashboard', path: '/Modulo-Bienestar-Comun/Dashboard' },
      { title: 'Masters', path: '/Modulo-Bienestar-Comun/Masters' },
    ],
  },

  // Modulo Psicologia
  {
    title: 'Modulo Psicologia',
    path: '/Modulo-Psicologia',
    children: [
      { title: 'Dashboard', path: '/Modulo-Bienestar-Comun/Dashboard' },
      { title: 'Masters', path: '/Modulo-Bienestar-Comun/Masters' },
    ],
  },
];

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule , HttpClientModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent {
  dropdownIndex: number | null = null;
  subDropdownIndex: Map<number, number | null> = new Map();
  grandSubDropdownIndex: Map<number, Map<number, number | null>> = new Map();
  menuItems = MENU_ITEMS;

  constructor(private router: Router) {}

  // Alternar Dropdown principal
  toggleDropdown(index: number): void {
    this.dropdownIndex = this.dropdownIndex === index ? null : index;
  }

  // Alternar Submenú
  toggleSubDropdown(parentIndex: number, childIndex: number): void {
    const current = this.subDropdownIndex.get(parentIndex);
    this.subDropdownIndex.set(parentIndex, current === childIndex ? null : childIndex);
  }

  // Alternar Sub-Submenú
  toggleGrandSubDropdown(parentIndex: number, childIndex: number, grandChildIndex: number): void {
    if (!this.grandSubDropdownIndex.has(parentIndex)) {
      this.grandSubDropdownIndex.set(parentIndex, new Map());
    }
    const subMap = this.grandSubDropdownIndex.get(parentIndex)!;
    const current = subMap.get(childIndex);
    subMap.set(childIndex, current === grandChildIndex ? null : grandChildIndex);
  }

  // Verificar si una ruta está activa
  isRouteActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }

  // Cerrar sesión
  logout(): void {
    console.log('Sesión cerrada');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
