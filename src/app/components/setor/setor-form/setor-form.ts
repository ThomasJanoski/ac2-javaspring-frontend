import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SetorService } from '../../../services/setor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setor-form',
  templateUrl: './setor-form.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./setor-form.css']
})
export class SetorFormComponent implements OnInit {
  setorForm: FormGroup;
  isEdit = false;
  setorId: number | null = null;
  loading = false;

  router: Router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private setorService: SetorService,
    private route: ActivatedRoute,
  ) {
    this.setorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.setorId = this.route.snapshot.params['id'];
    if (this.setorId) {
      this.isEdit = true;
      this.loadSetor(this.setorId);
    }
  }

  loadSetor(id: number): void {
    this.loading = true;
    this.setorService.getById(id).subscribe({
      next: (setor) => {
        this.setorForm.patchValue({
          nome: setor.nome
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar setor:', error);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.setorForm.valid) {
      const setorData = this.setorForm.value;
      this.loading = true;

      if (this.isEdit && this.setorId) {
        this.setorService.update(this.setorId, { ...setorData, id: this.setorId }).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/setores']);
          },
          error: (error) => {
            console.error('Erro ao atualizar setor:', error);
            this.loading = false;
          }
        });
      } else {
        this.setorService.create(setorData).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/setores']);
          },
          error: (error) => {
            console.error('Erro ao criar setor:', error);
            this.loading = false;
          }
        });
      }
    }
  }

  get nome() { return this.setorForm.get('nome'); }
}