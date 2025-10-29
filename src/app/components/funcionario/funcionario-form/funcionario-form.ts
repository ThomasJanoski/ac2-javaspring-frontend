import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario';
import { SetorService } from '../../../services/setor';
import { ProjetoService } from '../../../services/projeto';
import { DadosSetorDTO } from '../../../models/setor';
import { DadosProjetoDTO } from '../../../models/projeto';
import { DadosFuncionarioDTO } from '../../../models/funcionario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.html',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  styleUrls: ['./funcionario-form.css']
})
export class FuncionarioFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  funcionarioId?: number;
  setores: DadosSetorDTO[] = [];
  projetos: DadosProjetoDTO[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private setorService: SetorService,
    private projetoService: ProjetoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      setorId: [null, Validators.required],
      projetoIds: [[]]
    });
  }

  ngOnInit(): void {
    this.loadSetores();
    this.loadProjetos();

    this.funcionarioId = this.route.snapshot.params['id'];
    if (this.funcionarioId) {
      this.isEdit = true;
      this.loadFuncionario(this.funcionarioId);
    }
  }

  loadSetores(): void {
    this.setorService.getAll().subscribe(data => this.setores = data);
  }

  loadProjetos(): void {
    this.projetoService.getAll().subscribe(data => this.projetos = data);
  }

  loadFuncionario(id: number): void {
    this.loading = true;
    this.funcionarioService.getById(id).subscribe({
      next: (f) => {
        this.form.patchValue({
          nome: f.nome,
          setorId: f.setor?.id,
          projetoIds: f.projetos?.map(p => p.id) || []
        });
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const data: Partial<DadosFuncionarioDTO> = {
      nome: this.form.value.nome,
      setor: { id: parseInt(this.form.value.setorId) },
      projetos: this.form.value.projetoIds.map((id: number) => ({ id }))
    };

    this.loading = true;
    const action = this.isEdit
      ? this.funcionarioService.update(this.funcionarioId!, data as DadosFuncionarioDTO)
      : this.funcionarioService.create(data as DadosFuncionarioDTO);

    action.subscribe({
      next: () => this.router.navigate(['/funcionarios']),
      error: (err) => {
        alert('Erro: ' + err.error.message);
        this.loading = false;
      }
    });
  }

  toggleProjeto(id: number | undefined, event: any) {
    const checked = event.target.checked;
    const array = this.form.get('projetoIds')?.value || [];
    if (checked) {
      if (!array.includes(id)) array.push(id);
    } else {
      const index = array.indexOf(id);
      if (index > -1) array.splice(index, 1);
    }
    this.form.get('projetoIds')?.setValue(array);
  }

  get nome() { return this.form.get('nome'); }
  get setorId() { return this.form.get('setorId'); }
}