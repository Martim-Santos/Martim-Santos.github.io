AFRAME.registerComponent('dynamic-movement', {
    schema: { type: { type: 'string' }, speed: { type: 'number', default: 0.00001 } },
    init() {
        // Delay initialization to ensure GPS coordinates are loaded
        setTimeout(() => {
            const gpsData = this.el.getAttribute('gps-new-entity-place');
            if (!gpsData) {
                console.error("GPS data not found for entity:", this.el);
                return;
            }
            this.originalLat = gpsData.latitude;
            this.originalLon = gpsData.longitude;
            this.angle = 0;
        }, 1000); // Wait 1 second before accessing GPS data
    },
    tick(time, timeDelta) {
        if (this.originalLat === undefined || this.originalLon === undefined) return; // Prevent errors

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
