AFRAME.registerComponent('show-plane', {
    schema: { color: { type: 'string', default: 'white' } },
    init() {
        this.el.addEventListener('click', this.showPlane.bind(this));
    },
    showPlane() {
        const camera = document.querySelector('[gps-new-camera]');
        if (document.querySelector('#infoPlane')) return;

        const plane = document.createElement('a-plane');
        plane.setAttribute('position', '0 0 -2');
        plane.setAttribute('width', '2');
        plane.setAttribute('height', '1');
        plane.setAttribute('color', this.data.color);
        plane.setAttribute('material', 'opacity: 0.8; transparent: true');
        plane.setAttribute('id', 'infoPlane');
        plane.setAttribute('look-at', '[gps-new-camera]');

        plane.addEventListener('click', () => {
            camera.removeChild(plane);
        });

        camera.appendChild(plane);
    }
});
