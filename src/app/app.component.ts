//app.component.ts
import {Component, OnInit} from '@angular/core'; // Importing OnInit hook
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ThisReceiver } from '@angular/compiler';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  value:any;

  getFilm(){
    let aa=String(this.value);
    console.log("Film entered is -- " + aa);
    this.buscarpelicula(aa);
    return aa;
  }
	title ='api-angular';
  pel=this.getFilm();

  buscarpelicula(_pelicula: string){
    let peli=_pelicula
    if(peli=='undefined'){
      peli=''
    }
		const _url='https://imdb8.p.rapidapi.com/auto-complete?q='
    fetch(_url+peli,{
        "method": "GET",
        "headers": {
          "X-RapidAPI-Key": "2eb5faaa98msha54e6e251548835p153a74jsnc4e69658bf4c",
          "X-RapidAPI-Host": "imdb8.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then(data => {
        const list = data.d;
        list.map((item: any)=>{
          console.log(item)
          const name=item.l;
          const poster=item.i.imageUrl;
          const año=item.y;
          const rank=item.rank;
          const type=item.qid;
          const prota=item.s;
          const movie=`
          <li>
          <img src="${poster}">
          <h2>${name}</h2>
          <div class="infopeli">
            <p>Year ${año}</p>
            <p>Ranking ${rank}</p>
            <p>Protagonistas ${prota}</p>
            <p>Tipo ${type}</p>
          </div>
          </li>`;
          console.log(movie)
          document.querySelector('.movies')!.innerHTML+=movie;
        })
      })
      .catch(err => console.error(err));
    }

    ngOnInit() {
	}



}


