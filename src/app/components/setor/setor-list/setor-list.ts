import { Component, OnInit } from '@angular/core';
import { SetorService } from '../../../services/setor';
import { DadosSetorDTO } from '../../../models/setor';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setor-list',
  imports: [CommonModule],
  templateUrl: './setor-list.html',
  styleUrls: ['./setor-list.css']
})
export class SetorListComponent implements OnInit {
  setores: DadosSetorDTO[] = [];
  loading = true;

  constructor(
    private setorService: SetorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSetores();
  }

  loadSetores(): void {
    this.setorService.getAllWithFuncionarios().subscribe({
      next: (data) => {
        this.setores = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar setores:', error);
        this.loading = false;
      }
    });
  }

  editSetor(id: number): void {
    this.router.navigate(['/setores/edit', id]);
  }

  deleteSetor(id: number): void {
    if (confirm('Tem certeza que deseja excluir este setor?')) {
      this.setorService.delete(id).subscribe({
        next: () => {
          this.loadSetores();
        },
        error: (error) => {
          console.error('Erro ao excluir setor:', error);
        }
      });
    }
  }

  addSetor(): void {
    this.router.navigate(['/setores/add']);
  }
}