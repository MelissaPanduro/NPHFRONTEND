import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://fictional-funicular-7vrx775qp965hxw6g-8085.app.github.dev/productos';

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getAllProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  // Obtener producto por ID
  getProductoById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo producto
  createProducto(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, product);
  }

  // Actualizar un producto existente
  updateProducto(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // Eliminar un producto de forma lógica
  deleteProducto(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }

  // Restaurar un producto (cambiar su estado a "activo")
  restoreProducto(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/restaurar/${id}`, null);
  }
}
