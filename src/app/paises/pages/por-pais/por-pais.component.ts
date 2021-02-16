import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {
  hayError: boolean = false;
  termino: string = '';
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) { }

  buscar(termino: string){
    this.hayError = false;
    this.mostrarSugerencias = false;
    this.paises = [];
    this.termino = termino;

    this.paisService.buscarPais(this.termino).subscribe( resp => {
      console.log(resp);
      this.paises = resp;
    }, (err) => {
      this.hayError = true;
    });
  }

  sugerencias(termino: string){
    this.hayError= false;
    this.mostrarSugerencias = true;
    this.termino = termino;
    
    this.paisService.buscarPais(termino).subscribe( paises => {
      this.paisesSugeridos = paises.slice(0,5);
    }, (err) => {
      this.paisesSugeridos = [];
    });
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
  }
}
