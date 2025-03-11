AFRAME.registerComponent('show-plane', {
    schema: { color: { type: 'string', default: 'white' } },
    init() {
        this.el.addEventListener('click', this.showPlane.bind(this));
    },
    showPlane() {
        console.log("📌 Sphere clicked, trying to show plane...");

        const camera = document.querySelector('[gps-new-camera]');
        if (!camera) {
            console.error("❌ Camera not found!");
            return;
        }

        if (document.querySelector('#infoPlane')) {
            console.log("🚫 A plane is already on screen, removing it.");
            document.querySelector('#infoPlane').remove();
            return;
        }

        console.log("✅ Creating new plane!");

        const plane = document.createElement('a-plane');
        plane.setAttribute('position', '0 0 -2'); 
        plane.setAttribute('width', '2');
        plane.setAttribute('height', '1');
        plane.setAttribute('color', this.data.color);
        plane.setAttribute('material', 'opacity: 0.8; transparent: true');
        plane.setAttribute('id', 'infoPlane');
        plane.setAttribute('look-at', '[gps-new-camera]'); 

        plane.addEventListener('click', () => {
            console.log("🗑 Removing plane...");
            plane.remove();
        });

        camera.appendChild(plane);
    }
});
