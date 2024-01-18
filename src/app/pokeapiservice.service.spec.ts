import { TestBed } from '@angular/core/testing';

import { PokeapiserviceService } from './pokeapiservice.service';

describe('PokeapiserviceService', () => {
  let service: PokeapiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeapiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
