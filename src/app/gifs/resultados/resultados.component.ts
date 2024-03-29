import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  get resultados(){
    return this.gifsService.resultados;
  }

  constructor(private gifsService : GifsService){}

  descargarImagen(url:string) {
    const a = document.createElement('a');
    a.href = url;

    a.download = 'imagen.gif';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
