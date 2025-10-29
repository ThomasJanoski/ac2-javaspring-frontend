import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { DadosFuncionarioDTO } from '../models/funcionario';
import { DadosProjetoDTO } from '../models/projeto';

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {

  constructor(private api: ApiService) { }

  create(funcionario: DadosFuncionarioDTO): Observable<DadosFuncionarioDTO> {
    return this.api.post<DadosFuncionarioDTO>('/funcionarios', funcionario);
  }

  update(id: number, funcionario: DadosFuncionarioDTO): Observable<DadosFuncionarioDTO> {
    return this.api.put<DadosFuncionarioDTO>(`/funcionarios/${id}`, funcionario);
  }

  delete(id: number): Observable<void> {
    return this.api.delete(`/funcionarios/${id}`);
  }

  getById(id: number): Observable<DadosFuncionarioDTO> {
    return this.api.get<DadosFuncionarioDTO>(`/funcionarios/${id}`);
  }

  getAll(): Observable<DadosFuncionarioDTO[]> {
    return this.api.get<DadosFuncionarioDTO[]>('/funcionarios');
  }

  addProjeto(funcionarioId: number, projetoId: number): Observable<void> {
    return this.api.post<void>(`/funcionarios/${funcionarioId}/projetos/${projetoId}`, null);
  }

  getProjetosById(funcionarioId: number): Observable<DadosProjetoDTO[]> {
    return this.api.get<DadosProjetoDTO[]>(`/funcionarios/${funcionarioId}/projetos`);
  }
}