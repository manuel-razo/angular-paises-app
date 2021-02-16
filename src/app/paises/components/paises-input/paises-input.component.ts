import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-paises-input',
  templateUrl: './paises-input.component.html',
  styles: [
  ]
})
export class PaisesInputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject<string>();
  termino: string = '';
  constructor() { }

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(500)).subscribe(valor =>{
      this.onDebounce.emit(valor);
    })
  }
  
  buscar(){
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(event: any){
    this.debouncer.next(this.termino); 
  }
}
