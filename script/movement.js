AFRAME.registerComponent('dynamic-movement', {
    schema: { type: { type: 'string' }, speed: { type: 'number', default: 0.00001 } },
    init() {
        this.originalLat = this.el.getAttribute('gps-new-entity-place').latitude;
        this.originalLon = this.el.getAttribute('gps-new-entity-place').longitude;
        this.angle = 0;
    },
    tick(time, timeDelta) {
        const speed = this.data.speed;
        
        if (this.data.type === "side") {
            // Green sphere moves left & right
            const offset = Math.sin(time / 1000) * speed;
            this.el.setAttribute('gps-new-entity-place', {
                latitude: this.originalLat,
                longitude: this.originalLon + offset
            });
        } 
        else if (this.data.type === "spin") {
            // Blue sphere orbits around the camera
            this.angle += speed * timeDelta;
            const radius = 0.00005;
            const newLat = this.originalLat + Math.cos(this.angle) * radius;
            const newLon = this.originalLon + Math.sin(this.angle) * radius;
            this.el.setAttribute('gps-new-entity-place', { latitude: newLat, longitude: newLon });
        }
    }
});
