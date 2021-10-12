import { AfterViewInit, Component, ElementRef, ViewChild,OnInit} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {


  constructor(private toastr: ToastrService) {}
   
  ngOnInit() {
    this.mynameRef?.nativeElement.focus()
    const input:any=document.querySelectorAll('input');
    const select:any=document.querySelectorAll('select');
    const API_URL="http://api.exchangeratesapi.io/v1/latest?access_key=4e5a9c431cc8c6cbc6cc87a34fccca6a& base = USD& symbols = GBP,JPY,EUR"
    
    let html='';
    async function currency() {
      const res=await fetch(API_URL)
      const data=await res.json();
      const arrKeys=Object.keys(data.rates)
      const rates=data.rates;
      console.log(rates)
      const usedCountries=[]

      // code to dynamically add the dropdown
      usedCountries.push(arrKeys[149],arrKeys[46],arrKeys[49],arrKeys[73],arrKeys[106])
      usedCountries.map(item=>{
        return html +=`<option value=${item}>${item}</option>`
      })
      console.log(html)
      for(let i=0; i<select.length; i++){
        select[i].innerHTML=html
      };
    }
  currency()
  }


  
  title = 'currencyConverter';
  @ViewChild('mynameReF') mynameRef:ElementRef | undefined
  ngAfterViewInit(){
    
  }
  onSubmit(){
    this.mynameRef?.nativeElement.focus()
    const input:any=document.querySelectorAll('input');
    const select:any=document.querySelectorAll('select');
    const API_URL="http://api.exchangeratesapi.io/v1/latest?access_key=4e5a9c431cc8c6cbc6cc87a34fccca6a& base = USD& symbols = GBP,JPY,EUR"
    let selectedOne=select[0].options[select[0].selectedIndex].text
    let selectedtwo=select[1].options[select[1].selectedIndex].text
    if(selectedtwo===selectedOne){
      this.toastr.error("You Can't select the same currency",'NOT calculated',{
        timeOut:5000,
        progressBar:false
      })
    }else{
      async function currency() {
        const res=await fetch(API_URL)
        const data=await res.json();
        const arrKeys=Object.keys(data.rates)
        const rates=data.rates;
  
        function convert(i: any,j: any){
          input[i].value=input[j].value * rates[select[i].value]/rates[select[j].value]
        }
        input[0].addEventListener('keyup',()=>convert(1,0));
    
        input[1].addEventListener('keyup',()=>convert(0,1));
    
        select[0].addEventListener('change',()=>convert(1,0));
    
        select[1].addEventListener('change',()=>convert(0,1));
      
      }
    currency()
    }
    
  }

}
