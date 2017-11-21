import { Component,AfterViewChecked,ElementRef } from '@angular/core';// Có thể dùng AfterContentInit cho AfterViewChecked

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked{
  constructor(private elementRef:ElementRef)
  {

  }
  ngAfterViewChecked(){
    var s = document.createElement("script");
    s.type ="text/javascript";
    s.src="../assets/Js/custom.js";
    this.elementRef.nativeElement.appendChild(s);// Chú ý còn xóa trước khi dán
   
  }
}
