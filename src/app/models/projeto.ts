import { DadosFuncionarioDTO } from "./funcionario";

export interface DadosProjetoDTO {
    id: number;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    funcionarios: DadosFuncionarioDTO[];
}