import { TestBed } from '@angular/core/testing';

import { ProjetoService } from './projeto';

describe('Projeto', () => {
  let service: ProjetoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
