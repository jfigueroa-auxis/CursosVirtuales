import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-barra-progreso-circular',
  templateUrl: './barra-progreso-circular.component.html',
  styleUrls: ['./barra-progreso-circular.component.css']
})
export class BarraProgresoCircularComponent implements OnInit {

  @ViewChild("canvas", { static: false }) canvas: ElementRef;

  @Input("percent") percent: number;
  @Input("size") size: number;
  @Input("line") line: number;
  @Input("rotate") rotate: number;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const options = {
      percent: this.percent || 0,
      size: this.size || 220,
      lineWidth: this.line || 15,
      rotate: this.rotate || 0
    }

    const canvas = this.canvas.nativeElement;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = options.size;

    ctx.translate(options.size / 2, options.size / 2); // change center
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

    const radius = (options.size - options.lineWidth) / 2;

    this.drawCircle(ctx, '#efefef', options.lineWidth, 1, radius);
    this.drawCircle(ctx, '#636f07', options.lineWidth, options.percent, radius);
  }


  private drawCircle(ctx, color, lineWidth, percent, radius): void {
    //percent = Math.min(Math.max(0, percent || 1), 1);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = color;
    ctx.lineCap = 'round'; // butt, round or square
    ctx.lineWidth = lineWidth
    ctx.stroke();
  }
}
