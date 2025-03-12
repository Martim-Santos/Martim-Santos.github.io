function createSpheres() {
    const spheresData = [
        { color: "red", lat: 39.479866, lon: -8.337769 }, // Static sphere
        { color: "blue", movement: "spin", lat: 39.479832, lon: -8.337651 },
        { color: "green", movement: "side", lat: 39.479923, lon: -8.337721 }
    ];

    const scene = document.querySelector("a-scene");

    spheresData.forEach((data) => {
        const entity = document.createElement("a-entity");
        entity.setAttribute("cursor","rayOrigin:mouse");

        const sphere = document.createElement("a-sphere");
        sphere.setAttribute("gps-new-entity-place", "latitude: ${data.lat}; longitude: ${data.lon}");
        sphere.setAttribute("radius", "1.25");
        sphere.setAttribute("color", data.color);
        sphere.setAttribute("shadow", "");
        sphere.setAttribute("show-plane", `color: ${data.color}`);

        // Only add movement if the sphere has a movement type
        if (data.movement) {
            sphere.setAttribute("dynamic-movement", `type: ${data.movement}`);
        }

        entity.appendChild(sphere);
        scene.appendChild(entity);
    });
}

document.addEventListener("DOMContentLoaded", createSpheres);
