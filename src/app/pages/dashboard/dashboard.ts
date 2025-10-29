import { Component, OnInit } from '@angular/core';
import { SetorService } from '../../services/setor';
import { FuncionarioService } from '../../services/funcionario';
import { ProjetoService } from '../../services/projeto';
import { DadosProjetoDTO } from '../../models/projeto';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  // Métricas
  totalSetores = 0;
  totalFuncionarios = 0;
  totalProjetos = 0;
  projetosAtivos = 0;

  // Gráfico
  chartData: any[] = [];
  chartLabels: string[] = [];
  chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      title: { display: true, text: 'Projetos por Setor' }
    }
  };

  // Tabela de projetos recentes
  projetosRecentes: DadosProjetoDTO[] = [];
  loading = true;

  constructor(
    private setorService: SetorService,
    private funcionarioService: FuncionarioService,
    private projetoService: ProjetoService
  ) { }

  ngOnInit(): void {
    this.loadMetrics();
    this.loadChartData();
    this.loadProjetosRecentes();
  }

  loadMetrics(): void {
    this.setorService.getAll().subscribe(data => this.totalSetores = data.length);
    this.funcionarioService.getAll().subscribe(data => this.totalFuncionarios = data.length);

    this.projetoService.getAll().subscribe(projetos => {
      this.totalProjetos = projetos.length;
      const hoje = new Date().toISOString().split('T')[0];
      this.projetosAtivos = projetos.filter(p => p.dataFim >= hoje).length;
    });
  }

  loadChartData(): void {
    this.projetoService.getAll().subscribe(projetos => {
      const contagem: { [setor: string]: number } = {};

      projetos.forEach(p => {
        p.funcionarios?.forEach(f => {
          const nomeSetor = f.setor?.nome || 'Sem Setor';
          contagem[nomeSetor] = (contagem[nomeSetor] || 0) + 1;
        });
      });

      this.chartLabels = Object.keys(contagem);
      this.chartData = [
        {
          data: Object.values(contagem),
          label: 'Projetos',
          backgroundColor: [
            '#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14'
          ]
        }
      ];
    });
  }

  loadProjetosRecentes(): void {
    this.projetoService.getAll().subscribe(projetos => {
      this.projetosRecentes = projetos
        .sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime())
        .slice(0, 5);
      this.loading = false;
    });
  }

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }
}