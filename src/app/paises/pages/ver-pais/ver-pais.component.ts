import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {
  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private paisServices: PaisService
    ) { }

  ngOnInit(): void {
    /* this.activatedRoute.params.subscribe( params => {
      console.log(params.id);
      this.paisServices.buscarPaisPorCodigo(params.id).subscribe(pais => {
        console.log(pais);
      })
    }); */

    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.paisServices.buscarPaisPorCodigo(params.id)),
        tap(console.log)
      ).subscribe(resp => this.pais = resp);
  }

}
