// Create the map and set initial view (0,0 coordinates with zoom)
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 3,
  zoomControl: true,
  attributionControl: false
});

// Image setup
const mapWidth = 2400;  // pixels of your map image
const mapHeight = 3200;
const imageUrl = './assets/map.jpg'; // path to your custom RPG map image

// Coordinate bounds for the image
const bounds = [[0, 0], [mapHeight, mapWidth]];

// Add the image overlay
L.imageOverlay(imageUrl, bounds).addTo(map);

// Fit map to image bounds
map.fitBounds(bounds);
map.setMaxBounds(bounds);
map.options.maxBoundsViscosity = 1.0;

const overlays = {}

// Define some markers with positions (x, y)
fetch('./assets/markers.json')
  .then(response => response.json())
  .then(locations => {
    locations.forEach(loc => {

      const layerName = '<img src="./assets/icons/' + loc.icon + '.svg" class="layerControlEmoji"> ' + loc.icon;
      if (!overlays[layerName]) {
        overlays[layerName] = L.layerGroup().addTo(map);
      }

      let iconSize = 32;
      const customIcon = L.icon({
        iconUrl: './assets/icons/' + loc.icon + '.svg',
        iconSize: [iconSize, iconSize],
        iconAnchor: [(iconSize / 2), (iconSize / 2)],
        popupAnchor: [0, -(iconSize / 2)]
      });

      L.marker(loc.coords, { icon: customIcon })
        .addTo(overlays[layerName])
        .bindTooltip(loc.name, { permanent: true, direction: 'top', offset: [0, -10] })
        .bindPopup('<b>' + loc.name + '</b><hr>' + loc.description);
    });
    L.control.layers(null, overlays, {collapsed: L.Browser.mobile}).addTo(map);
  })
  .catch(err => console.error('Error loading markers:', err));

overlays["Domínios"] = L.layerGroup().addTo(map);

fetch('./assets/areas.json')
  .then(response => response.json())
  .then(areas => {
    areas.forEach(area => {
      L.polygon(area.coords, { color: area.color, fillOpacity: 0.5, weight: 4 })
        .addTo(overlays["Domínios"]);
    });
  }).catch(err => console.error('Error loading areas:', err));



// Live Coordinates
map.on('mousemove', function (e) {
  document.getElementById('coords').innerHTML = 'Lat: ' + Math.floor(e.latlng.lat) + ' Lon: ' + Math.floor(e.latlng.lng);
});

map.on('click', function (e) {
  if (e.originalEvent.shiftKey) {
    const { lat, lng } = e.latlng;
    const text = lat + ', ' + lng;
    navigator.clipboard.writeText(text);
    confirm('Copiado: ' + text);
  }
})