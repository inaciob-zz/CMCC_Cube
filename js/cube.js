var container, stats;
var camera, controls, scene, renderer;
var cube, plane;

var targetRotation = 0;
//This needs to be declared separately, currently not sure why but cube does not appear otherwise
var targetRotationOnMouseDown = 0;
var rotationSpeed = 0.05;
		
var mouseX, mouseY, mouseXOnMouseDown, mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
		
init();
animate();

function init() {
		container = document.createElement( 'div' );
		document.body.appendChild( container );
			
		//The smaller the first number is, the closer the cube appears
		camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
		//The height of the camera in comparison to the scene
		camera.position.y = 250;
		//The zoom level of the camera
		camera.position.z = 500;
			
		//The mouse controls that allow for dragging of cube closer or further away visually
		controls = new THREE.TrackballControls( camera );
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.0;
		controls.panSpeed = 0.8;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;
		controls.addEventListener('change', render, false);
			
		//Create the scene
		scene = new THREE.Scene();

		//Cube
		var geometry = new THREE.CubeGeometry(200, 200, 200);
			
		//This is the 'shadow'/plane colour
		var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, vertexColors: THREE.FaceColors} );
			
		for(var i=0; i < geometry.faces.length; i++) {
			//This is the cube colour -> each face will have a different colour
			//light red (right side)
			geometry.faces[0].color.setHex(0xff0033);
			//red (left side)
			geometry.faces[1].color.setHex(0xff0000);
			//green (top)
			geometry.faces[2].color.setHex(0x00ff00);
			//blue (front)
			geometry.faces[4].color.setHex(0x0000ff);
			//light green (bottom)
			geometry.faces[3].color.setHex(0x33ff66);
			//light blue (back)
			geometry.faces[5].color.setHex(0x0066cc);
		}
			
		cube = new THREE.Mesh(geometry, material);
		cube.position.y = 100;
		scene.add(cube);

		//Plane
		var geometry = new THREE.PlaneGeometry(200, 200);
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
		plane = new THREE.Mesh(geometry, material);
		scene.add(plane);

		renderer = new THREE.CanvasRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild( renderer.domElement );

		document.addEventListener('mousedown', onDocumentMouseDown, false);
		document.addEventListener('touchstart', onDocumentTouchStart, false);
		document.addEventListener('touchmove', onDocumentTouchMove, false);

		window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
			
		controls.handleResize();
		render();
}

function onDocumentMouseDown( event ) {
		event.preventDefault();

		document.addEventListener('mousemove', onDocumentMouseMove, false );
		document.addEventListener('mouseup', onDocumentMouseUp, false );
		document.addEventListener('mouseout', onDocumentMouseOut, false );
			
		mouseXOnMouseDown = event.clientX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove(event) {
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
}

function onDocumentMouseUp(event) {
		document.removeEventListener('mousemove', onDocumentMouseMove, false);
		document.removeEventListener('mouseup', onDocumentMouseUp, false);
		document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseOut(event) {
		//To get rid of redundant code, call function that does same thing above
		onDocumentMouseUp(event);
}

function onDocumentTouchStart(event) {
		if (event.touches.length === 1) {
			event.preventDefault();
				
			mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
			targetRotationOnMouseDown = targetRotation;
		}
}

function onDocumentTouchMove(event) {
		if (event.touches.length === 1) {
			event.preventDefault();
				
			mouseX = event.touches[0].pageX - windowHalfX;
			//The rotation of the cube on its' x-axis
			targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * rotationSpeed;
		}
}
		
		
/**************THIS BLOCK IS NECESSARY -> DRAWS DEBUG AXES********************/
var debugaxis = function(axisLength){
    //Shorten the vertex function
	function v(x,y,z){ 
		return new THREE.Vector3(x,y,z); 
	}
    
	//Create axis (point1, point2, colour)
	function createAxis(p1, p2, color){
		var line, lineGeometry = new THREE.Geometry(),
		lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
		lineGeometry.vertices.push(p1, p2);
		line = new THREE.Line(lineGeometry, lineMat);
		scene.add(line);
	}
		
	createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
	createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
	createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
};

//To use enter the axis length
debugaxis(400);
/**************************************************************************************/
		
function animate() {
		requestAnimationFrame( animate );
		controls.update();
		render();
}

function render() {
		//The rotation speed of the plane (needs to match speed of cube for realism)
		plane.rotation.x = cube.rotation.x += ( targetRotation - cube.rotation.x ) * rotationSpeed;
		plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * rotationSpeed;
		renderer.render( scene, camera );
}