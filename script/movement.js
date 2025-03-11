AFRAME.registerComponent('dynamic-movement', {
    schema: { type: 'string', default: '' },
    init() {
        this.originalLat = null;
        this.originalLon = null;
        this.angle = 0;

        // Keep checking until gps-new-entity-place is available
        this.checkGPSData();
    },
    checkGPSData() {
        const gpsData = this.el.getAttribute('gps-new-entity-place');

        if (gpsData && gpsData.latitude !== undefined && gpsData.longitude !== undefined) {
            this.originalLat = gpsData.latitude;
            this.originalLon = gpsData.longitude;
            console.log(`GPS initialized for ${this.data.type}:`, this.originalLat, this.originalLon);
        } else {
            // Retry after a short delay
            setTimeout(() => this.checkGPSData(), 500);
        }
    },
    tick(time, timeDelta) {
        if (this.originalLat === null || this.originalLon === null) return; // Wait for GPS data

        const speed = 0.00001; // Adjust as needed

        if (this.data === "side") {
            // Green sphere moves left & right
            const offset = Math.sin(time / 1000) * speed;
            this.el.setAttribute('gps-new-entity-place', {
                latitude: this.originalLat,
                longitude: this.originalLon + offset
            });
        } 
        else if (this.data === "spin") {
            // Blue sphere orbits around the camera
            this.angle += speed * timeDelta;
            const radius = 0.00005;
            const newLat = this.originalLat + Math.cos(this.angle) * radius;
            const newLon = this.originalLon + Math.sin(this.angle) * radius;
            this.el.setAttribute('gps-new-entity-place', { latitude: newLat, longitude: newLon });
        }
    }
});
