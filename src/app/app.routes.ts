import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { SetorListComponent } from './components/setor/setor-list/setor-list';
import { SetorFormComponent } from './components/setor/setor-form/setor-form';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form';
import { ProjetoListComponent } from './components/projeto/projeto-list/projeto-list';
import { ProjetoFormComponent } from './components/projeto/projeto-form/projeto-form';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },

    // Setores
    { path: 'setores', component: SetorListComponent },
    { path: 'setores/add', component: SetorFormComponent },
    { path: 'setores/edit/:id', component: SetorFormComponent },

    // Funcionários
    { path: 'funcionarios', component: FuncionarioListComponent },
    { path: 'funcionarios/add', component: FuncionarioFormComponent },
    { path: 'funcionarios/edit/:id', component: FuncionarioFormComponent },

    // Projetos
    { path: 'projetos', component: ProjetoListComponent },
    { path: 'projetos/add', component: ProjetoFormComponent },
    { path: 'projetos/edit/:id', component: ProjetoFormComponent }
];
