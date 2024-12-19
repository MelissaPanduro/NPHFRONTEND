import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductService } from './service/product.service';
import { Product } from './model/product';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './defer-options.component.html',
  styles: ``
})
export default class DeferOptionsComponent implements OnInit {

  isModalOpen = false;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = true;
  isActive: boolean = true;
  isEditMode: boolean = false; // Para determinar si estamos en modo edición o agregar

  // Filtros
  nameFilter: string = '';
  descriptionFilter: string = '';

  // Producto en edición o creación
  editProduct: Product | null = null;
  productForm: Product = {
    idProducto: undefined,
    nombre: '',
    descripcion: '',
    unidadMedida: '',
    precioUnitario: 0,
    categoria: '',
    fechaCreacion: '',
    estado: 'activo'
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // Obtener todos los productos
  getProducts(): void {
    this.productService.getAllProductos().subscribe({
      next: (data) => {
        this.products = data;
        this.filterProducts();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      }
    });
  }

    // Filtrar proveedores según estado, nombre y descripción
    filterProducts(): void {
      this.filteredProducts = this.products.filter(products => {
        const matchesStatus = products.estado === (this.isActive ? 'activo' : 'I');
        const matchesName = products.nombre
          .toLowerCase()
          .includes(this.nameFilter.toLowerCase());
        return matchesStatus && matchesName;
      });
    }


  // Cambiar el estado del switcher y actualizar la lista filtrada
  toggleStatus(): void {
    this.filterProducts(); // Refrescar la lista filtrada
  }

  // Activar un producto
  activateProduct(id: number): void {
    this.productService.restoreProducto(id).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (err) => {
        console.error('Error activating product:', err);
      }
    });
  }

  // Inactivar un producto
  inactivateProduct(id: number): void {
    this.productService.deleteProducto(id).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (err) => {
        console.error('Error inactivating product:', err);
      }
    });
  }

  // Abrir el modal en modo agregar
  openModal(): void {
    this.isEditMode = false;
    this.productForm = {
      idProducto: undefined,
      nombre: '',
      descripcion: '',
      unidadMedida: '',
      precioUnitario: 0,
      categoria: '',
      fechaCreacion: '',
      estado: 'activo'
    };
    this.isModalOpen = true;
  }

  // Abrir el modal en modo edición
  editProductDetails(product: Product): void {
    this.isEditMode = true;
    this.productForm = { ...product };
    this.isModalOpen = true;
  }

  // Cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Agregar un nuevo producto
  addProduct(): void {
    this.productService.createProducto(this.productForm).subscribe({
      next: () => {
        this.getProducts(); // Refrescar la lista
        this.closeModal(); // Cerrar el modal
      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
    });
  }

  // Actualizar un producto existente
  updateProduct(): void {
    if (this.productForm.idProducto) {
      this.productService.updateProducto(this.productForm.idProducto, this.productForm).subscribe({
        next: () => {
          this.getProducts(); // Refrescar la lista
          this.closeModal(); // Cerrar el modal
        },
        error: (err) => {
          console.error('Error updating product:', err);
        }
      });
    }
  }
}
