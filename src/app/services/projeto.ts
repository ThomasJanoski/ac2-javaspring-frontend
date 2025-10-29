import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { DadosProjetoDTO } from '../models/projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(private api: ApiService) { }

  create(projeto: DadosProjetoDTO): Observable<DadosProjetoDTO> {
    return this.api.post<DadosProjetoDTO>('/projetos', projeto);
  }

  update(id: number, projeto: DadosProjetoDTO): Observable<DadosProjetoDTO> {
    return this.api.put<DadosProjetoDTO>(`/projetos/${id}`, projeto);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(`/projetos/${id}`);
  }

  getById(id: number): Observable<DadosProjetoDTO> {
    return this.api.get<DadosProjetoDTO>(`/projetos/${id}`);
  }

  getAll(): Observable<DadosProjetoDTO[]> {
    return this.api.get<DadosProjetoDTO[]>('/projetos');
  }

  getByPeriodo(start: string, end: string): Observable<DadosProjetoDTO[]> {
    return this.api.get<DadosProjetoDTO[]>(`/projetos/periodo?start=${start}&end=${end}`);
  }

  addFuncionario(projetoId: number, funcionarioId: number): Observable<void> {
    return this.api.post<void>(`/projetos/${projetoId}/funcionarios/${funcionarioId}`, null);
  }
}