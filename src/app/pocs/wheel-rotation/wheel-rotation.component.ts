import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-wheel-rotation',
  templateUrl: './wheel-rotation.component.html',
  styleUrls: ['./wheel-rotation.component.css']
})
export class WheelRotationComponent implements OnInit {
  @ViewChild('canvasElement') canvasElementRef: ElementRef;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  wheelImage: HTMLImageElement;
  wheelDiameter = '160';
  frame = 1;
  frameSpeed = '2';
  floorY: number;

  constructor() { }

  ngOnInit() {
    this.canvas = this.canvasElementRef.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.floorY = this.canvas.height * 0.82;
    this.wheelImage = new Image();
    this.wheelImage.src = 'assets/potatocar-wheel.png';

    this.draw();
  }

  draw() {
    // Clear Previous Canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Layers
    this.drawFloor();
    this.drawWheel();
    this.drawCircumferenceArc();

    // Update frame number that others may reference
    this.frame += parseInt(this.frameSpeed, 10);

    // Call next draw frame to continue endless loop
    window.requestAnimationFrame(this.draw.bind(this));
  }

  drawWheel() {
    const wheelWidth = parseInt(this.wheelDiameter, 10);
    const wheelHeight = this.wheelImage.height * (wheelWidth / this.wheelImage.width);
    const wheelX = (this.canvas.width * 0.5);
    const wheelY = this.floorY - (wheelHeight * 0.5);

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    this.context.save();

    // move to the center of the wheel
    this.context.translate(wheelX, wheelY);

    // rotate the canvas to the specified degrees
    this.context.rotate(this.revolutionObject().radians);

    // draw the wheel image
    this.context.drawImage( this.wheelImage, (wheelWidth * -0.5), (wheelHeight * -0.5), wheelWidth, wheelHeight);

    // we’re done with the rotating so restore the unrotated context
    this.context.restore();
  }

  drawFloor() {
    // Draw horizontal line for the floor
    this.context.beginPath();
    this.context.moveTo(0, this.floorY);
    this.context.lineTo(this.canvas.width, this.floorY);
    this.context.stroke();

    // Draw Vertical Line on the center of the screen
    // this.context.moveTo(this.canvas.width * 0.5, 0);
    // this.context.lineTo(this.canvas.width * 0.5, this.canvas.height);
    // this.context.stroke();

    const ticks = this.canvas.width / 10;
    for (let index = 0; index <= ticks; index++) {
      const tickX = (index * ticks) - (this.frame % this.canvas.width);
      const tickHeight = (index % 10) ? 32 : 64;
      this.context.moveTo(tickX, this.floorY);
      this.context.lineTo(tickX, (this.floorY + tickHeight));
      this.context.stroke();
    }
  }

  drawCircumferenceArc() {
    const {
      degrees,
      radians,
      distance,
      circumference,
    } = this.revolutionObject();
    const radius = parseInt(this.wheelDiameter, 10) * 0.5;
    const arcX = this.canvas.width * 0.5;
    const arcY = this.floorY - radius;
    const clockDirection = degrees > 360;
    const offsetAngle = (0.5 * Math.PI);
    const startDegree = (clockDirection) ? 720 : 0;
    const startAngle = (startDegree * (Math.PI / 180)) + offsetAngle;
    const endAngle = radians + offsetAngle;

    const colorOne = 'rgba(0, 255, 255, 0.5)';
    const colorTwo = 'rgba(255, 255, 0, 0.5)';

    this.context.save();
    this.context.lineWidth = 10;
    this.context.beginPath();
    this.context.strokeStyle = colorOne;
    this.context.arc(arcX, arcY, radius, startAngle, endAngle, clockDirection);
    this.context.stroke();
    this.context.beginPath();
    this.context.strokeStyle = colorTwo;
    this.context.arc(arcX, arcY, radius, endAngle, startAngle, clockDirection);
    this.context.stroke();
    this.context.beginPath();
    this.context.strokeStyle = (!clockDirection) ? colorTwo : colorOne;
    this.context.moveTo(arcX, this.floorY);
    this.context.lineTo(arcX - (distance % circumference), this.floorY);
    this.context.stroke();
    this.context.beginPath();
    this.context.strokeStyle = (clockDirection) ? colorTwo : colorOne;
    this.context.moveTo(arcX - (distance % circumference), this.floorY);
    this.context.lineTo(arcX - (distance % circumference) - circumference, this.floorY);
    this.context.stroke();
    this.context.restore();
  }

  revolutionObject() {
    // Basic Reminders
    // circumference = diameter * PI
    // distance = circumference * revolutions
    // revolutions = distance / circumference

    const circumference = parseInt(this.wheelDiameter, 10) * Math.PI;
    const distance = this.frame % (circumference * 2);
    const revolutions = distance / circumference;
    const degrees = revolutions * 360;
    const radians = degrees * (Math.PI / 180);

    return {
      circumference,
      distance,
      revolutions,
      degrees,
      radians,
    };
  }

}
