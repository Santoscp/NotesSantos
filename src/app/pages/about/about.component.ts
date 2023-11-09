import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  src='https://source.unsplash.com/random'
  url= 'https://api.kanye.rest/'
  msg=''
 

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    fetch(this.url)
    .then(response=> response.json())
    .then(data=>this.msg=data.quote)
  
  this.http.get(this.url).subscribe((response)=>{
    console.log(response);
  })
  }


}
