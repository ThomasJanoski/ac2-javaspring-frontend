// src/app/shared/models/funcionario.ts
import { DadosSetorDTO } from './setor';
import { DadosProjetoDTO } from './projeto';

export interface DadosFuncionarioDTO {
    id?: number;
    nome: string;
    setor?: DadosSetorDTO | null;
    projetos?: DadosProjetoDTO[]; // opcional: só vem em GET /funcionarios
}