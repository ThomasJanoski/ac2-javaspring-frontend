import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { DadosSetorDTO } from '../models/setor';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

  constructor(private api: ApiService) { }

  create(setor: DadosSetorDTO): Observable<DadosSetorDTO> {
    return this.api.post<DadosSetorDTO>('/setores', setor);
  }

  update(id: number, setor: DadosSetorDTO): Observable<DadosSetorDTO> {
    return this.api.put<DadosSetorDTO>(`/setores/${id}`, setor);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(`/setores/${id}`);
  }

  getById(id: number): Observable<DadosSetorDTO> {
    return this.api.get<DadosSetorDTO>(`/setores/${id}`);
  }

  getAll(): Observable<DadosSetorDTO[]> {
    return this.api.get<DadosSetorDTO[]>('/setores');
  }

  getAllWithFuncionarios(): Observable<DadosSetorDTO[]> {
    return this.api.get<DadosSetorDTO[]>('/setores/todos');
  }
}