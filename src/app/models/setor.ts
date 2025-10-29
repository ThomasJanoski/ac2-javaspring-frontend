import { DadosFuncionarioDTO } from "./funcionario";

// src/app/shared/models/setor.ts
export interface DadosSetorDTO {
    id: number;
    nome?: string;
    funcionarios?: DadosFuncionarioDTO[]; // opcional: só vem em GET /setores/todos
}