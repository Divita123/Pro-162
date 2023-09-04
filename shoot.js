AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        bullet.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        bullet.setAttribute("dynamic-body", {shape:"sphere", mass:"0"})

        bullet.addEventListener("collide", this.removeBullet)

        scene.appendChild(bullet);
      }
    });
  },

  removeBullet: function (e) {
    //Original entity (bullet)
    console.log(e.detail.target.el);
    //Other entity, which bullet touched.
    console.log(e.detail.body.el);
    var element = e.detail.target.el
    var elementHit = e.detail.body.el
    //bullet element


    //element which is hit
 

    if (elementHit.id.includes("triangle")) 
      {
        var impulse = new CANNON.Vec3(0,1,-15);
        var worldPoint = new CANNON.Vec3().copy(
          elementHit.getAttribute("position")
        );
        elementHit.body.applyForce(impulse,worldPoint);
        element.removeEventListener("collide", this.removeBullet);
        var scene = document.querySelector("#scene");
        scene.removeChild(element);
        scene.removeChild(element);
    }
  },
});


