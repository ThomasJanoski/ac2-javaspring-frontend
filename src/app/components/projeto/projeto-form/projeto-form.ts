import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjetoService } from '../../../services/projeto';
import { FuncionarioService } from '../../../services/funcionario';
import { DadosFuncionarioDTO } from '../../../models/funcionario';
import { DadosProjetoDTO } from '../../../models/projeto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.html',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  styleUrls: ['./projeto-form.css']
})
export class ProjetoFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  projetoId: number = 0;
  funcionarios: DadosFuncionarioDTO[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private projetoService: ProjetoService,
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(5)]],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      funcionarioIds: [[]]
    }, { validators: this.dateValidator });
  }

  ngOnInit(): void {
    this.loadFuncionarios();

    this.projetoId = this.route.snapshot.params['id'];
    if (this.projetoId) {
      this.isEdit = true;
      this.loadProjeto(this.projetoId);
    }
  }

  loadFuncionarios(): void {
    this.funcionarioService.getAll().subscribe(data => this.funcionarios = data);
  }

  loadProjeto(id: number): void {
    this.loading = true;
    this.projetoService.getById(id).subscribe({
      next: (p) => {
        this.form.patchValue({
          descricao: p.descricao,
          dataInicio: p.dataInicio,
          dataFim: p.dataFim,
          funcionarioIds: p.funcionarios?.map(f => f.id) || []
        });
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  dateValidator(g: FormGroup) {
    const inicio = g.get('dataInicio')?.value;
    const fim = g.get('dataFim')?.value;
    return inicio && fim && inicio > fim ? { invalidDate: true } : null;
  }

  toggleFuncionario(id: number, event: any): void {
    const checked = event.target.checked;
    const array: number[] = this.form.get('funcionarioIds')?.value || [];
    if (checked && !array.includes(id)) {
      array.push(id);
    } else if (!checked) {
      const i = array.indexOf(id);
      if (i > -1) array.splice(i, 1);
    }
    this.form.get('funcionarioIds')?.setValue(array);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const data: Partial<DadosProjetoDTO> = {
      descricao: this.form.value.descricao,
      dataInicio: this.form.value.dataInicio,
      dataFim: this.form.value.dataFim,
      funcionarios: this.form.value.funcionarioIds.map((id: number) => ({ id }))
    };

    this.loading = true;
    const action = this.isEdit
      ? this.projetoService.update(this.projetoId, data as DadosProjetoDTO)
      : this.projetoService.create(data as DadosProjetoDTO);

    action.subscribe({
      next: () => this.router.navigate(['/projetos']),
      error: (err) => {
        alert('Erro: ' + err.error.message);
        this.loading = false;
      }
    });
  }
}