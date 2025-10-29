import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../../services/funcionario';
import { Router } from '@angular/router';
import { DadosFuncionarioDTO } from '../../../models/funcionario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funcionario-list',
  imports: [CommonModule],
  templateUrl: './funcionario-list.html',
  styleUrls: ['./funcionario-list.css']
})
export class FuncionarioListComponent implements OnInit {
  funcionarios: DadosFuncionarioDTO[] = [];
  loading = true;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFuncionarios();
  }

  loadFuncionarios(): void {
    this.funcionarioService.getAll().subscribe({
      next: (data) => {
        this.funcionarios = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar funcionários:', err);
        this.loading = false;
      }
    });
  }

  edit(id: number): void {
    this.router.navigate(['/funcionarios/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarioService.delete(id).subscribe({
        next: () => this.loadFuncionarios(),
        error: (err) => console.error(err.error.message)
      });
    }
  }

  add(): void {
    this.router.navigate(['/funcionarios/add']);
  }
}