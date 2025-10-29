import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  imports: [RouterLink],
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'bi-house-door-fill', route: '/dashboard' },
    { label: 'Setores', icon: 'bi-building', route: '/setores' },
    { label: 'Funcionários', icon: 'bi-people-fill', route: '/funcionarios' },
    { label: 'Projetos', icon: 'bi-briefcase-fill', route: '/projetos' }
  ];

  constructor(public router: Router) { }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}