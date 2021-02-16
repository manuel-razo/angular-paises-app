import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {
  hayError: boolean = false;
  termino: string = '';
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  buscar(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.paises = [];

    this.paisService.buscarCapital(this.termino).subscribe(resp=>{
      console.log(resp);
      this.paises = resp;
    }, (err) => {
      this.hayError = true;
    });
  }

  sugerencias(event: any){
    console.log('Yet to be implemented');
  }
}
