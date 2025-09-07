import { effect, Injectable, signal } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceTsService {
   private apiUrl = '../../../assets/seed.json';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de transacciones desde el archivo JSON.
   * @returns Un Observable de un array de transacciones.
   */
  public getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }
}
