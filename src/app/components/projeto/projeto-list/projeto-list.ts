import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../../../services/projeto';
import { Router } from '@angular/router';
import { DadosProjetoDTO } from '../../../models/projeto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projeto-list',
  imports: [CommonModule],
  templateUrl: './projeto-list.html',
  styleUrls: ['./projeto-list.css']
})
export class ProjetoListComponent implements OnInit {
  projetos: DadosProjetoDTO[] = [];
  loading = true;

  constructor(
    private projetoService: ProjetoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProjetos();
  }

  loadProjetos(): void {
    this.projetoService.getAll().subscribe({
      next: (data) => {
        this.projetos = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  edit(id: number): void {
    this.router.navigate(['/projetos/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Excluir projeto?')) {
      this.projetoService.delete(id).subscribe({
        next: () => this.loadProjetos(),
        error: (err) => alert(err.error.message)
      });
    }
  }

  add(): void {
    this.router.navigate(['/projetos/add']);
  }
}