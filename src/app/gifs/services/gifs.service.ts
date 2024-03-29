import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'CVV46o3vt4n2lH5FMSiGQYp6qdhti6Of';
  private URL : string = 'https://api.giphy.com/v1/gifs';
  private _historial:string[] =[];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http :HttpClient) {
    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    this.gifs();
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }


  buscarGifs( query:string){

    query = query.trim().toLowerCase();

    if (!this._historial.includes( query )) {

      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams().set('api_key', this.apiKey).set('limit','10').set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.URL }/search`,{ params })
      .subscribe(( resp ) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })
  }

  gifs(){
    // https://api.giphy.com/v1/gifs/trending?api_key=CVV46o3vt4n2lH5FMSiGQYp6qdhti6Of&q&limiit=10
    const params = new HttpParams().set('api_key', this.apiKey).set('limit','10');

    this.http.get<SearchGifsResponse>(`${this.URL}/trending`,{params})
    .subscribe(resp =>{
      if (this.resultados.length === 0) {
        this.resultados = resp.data;
      }

    })
    console.log()
  }
}
