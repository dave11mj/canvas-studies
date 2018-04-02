import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  WebGLRenderer,
  Scene,
  Mesh,
  PerspectiveCamera,
  MeshBasicMaterial,
  ObjectLoader,
  JSONLoader,
  BoxGeometry,
  Object3D,
  AxesHelper,
  GridHelper,
  Euler,
  Matrix4,
  Vector3
} from 'three';

@Component({
  selector: 'app-wheel-rotation-3d',
  templateUrl: './wheel-rotation-3d.component.html',
  styleUrls: ['./wheel-rotation-3d.component.css']
})
export class WheelRotation3dComponent implements OnInit {
  @ViewChild('rendererContainerRef') rendererContainerRef: ElementRef;
  renderer: WebGLRenderer = new WebGLRenderer();
  scene: Scene;
  camera: PerspectiveCamera;
  wheel: Mesh;
  wheelParent: Object3D;
  loader: JSONLoader;
  canvasWidth = 960;
  canvasHeight = 540;
  rotationDegree = 0;

  constructor() {
    this.scene = new Scene();

    this.camera = new PerspectiveCamera(60, this.canvasWidth / this.canvasHeight, 1, 10000);
    this.camera.position.y = 400;
    this.camera.rotation.x = -(20 * (Math.PI / 180));
    this.camera.position.z = 1000;

    const gridHelper = new GridHelper(5000, 100, 0xffffff, 0xffffff);
    const axesHelper = new AxesHelper( 500 );
    this.scene.add(axesHelper);
    this.scene.add(gridHelper);

    this.loader = new JSONLoader();
  }

  ngOnInit() {
    this.renderer.setSize(this.canvasWidth, this.canvasHeight);
    this.rendererContainerRef.nativeElement.appendChild(this.renderer.domElement);
    // load a resource
    this.loader.load(
      // resource URL
      'assets/offroad-wheel.json',
      // called when resource is loaded
      (geometry) => {
        const material = new MeshBasicMaterial({color: 0xff0000, wireframe: true});
        this.wheelParent = new Object3D();
        this.wheel = new Mesh( geometry, material );
        // this.wheelParent.rotation.y = (90 * (Math.PI / 180));
        const rotation = new Euler(0, (Math.PI * 0.5), 0);
        this.wheelParent.setRotationFromEuler(rotation);
        // this.wheel.rotation.y = 90;
        this.wheelParent.add(this.wheel);
        this.scene.add(this.wheelParent);
      },
      // called when loading is in progresses
      ( xhr ) => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
    );
    this.animate();
    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    this.onWindowResize();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());

    if (this.wheel) {
      // this.rotationDegree += 0.01;
      // const rotation = new Euler((this.rotationDegree * (Math.PI / 180)), (Math.PI * 0.5), (this.rotationDegree * (Math.PI / 180)));
      // this.wheelParent.setRotationFromEuler(rotation);
      // this.wheel.rotation.x += 0.01;
      // this.wheel.rotateX(0.01);

      // Rotate an object around an arbitrary axis in object space
      // const rotObjectMatrix = new Matrix4();
      // const axis = new Vector3(1, (Math.PI * 0.5), 0); // x axis
      // const radians = (this.rotationDegree * (Math.PI / 180));
      // rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

      this.wheelParent.rotateX(0.01);

      // this.wheelParent.matrix.multiply(rotObjectMatrix);

      // this.wheelParent.rotation.setFromRotationMatrix(this.wheelParent.matrix);
    }

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.canvasWidth = this.rendererContainerRef.nativeElement.offsetWidth;
    this.canvasHeight = this.rendererContainerRef.nativeElement.offsetHeight;
    this.camera.aspect = this.canvasWidth / this.canvasHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.canvasWidth, this.canvasHeight );
  }

}
