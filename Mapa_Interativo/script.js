if (!localStorage.getItem('underlay')) {
  localStorage.setItem('underlay', 'Padrão');
}

// Create the map and set initial view (0,0 coordinates with zoom)
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 3,
  zoomControl: true,
  attributionControl: false,
  boxZoom: false
});

// Image setup
const mapWidth = 2400;  // pixels of your map image
const mapHeight = 3200;

// Coordinate bounds for the image
const bounds = [[0, 0], [mapHeight, mapWidth]];


const underlays = {
  'Padrão': L.imageOverlay('./assets/map.jpg', bounds),
  'Editado': L.imageOverlay('./assets/map-clean-oil-flames.jpg', bounds),
}

underlays[localStorage.getItem('underlay')].addTo(map);

// Fit map to image bounds
map.fitBounds(bounds);
map.setMaxBounds(bounds);
map.options.maxBoundsViscosity = 0.75;

const micons = {}
const overlays = {}
overlays['<img src="./assets/icons/Area.svg" class="layerControlEmoji"> Áreas'] = L.layerGroup().addTo(map);

// Markers
const marcadores_l = JSON.parse(localStorage.getItem('marcadores'));

marcadores_l.forEach(loc => {

  const layerName = '<img src="./assets/icons/' + loc.icon + '.svg" class="layerControlEmoji"> ' + loc.icon;
  if (!overlays[layerName]) {
    overlays[layerName] = L.layerGroup().addTo(map);
  }

  if (!micons[loc.icon]) {
    const iconSize = 32;
    micons[loc.icon] = L.icon({
      iconUrl: './assets/icons/' + loc.icon + '.svg',
      iconSize: [iconSize, iconSize],
      iconAnchor: [(iconSize / 2), (iconSize / 2)],
      popupAnchor: [0, -(iconSize / 2)]
    });
  }

  L.marker(loc.coords, { icon: micons[loc.icon] })
    .addTo(overlays[layerName])
    .bindTooltip(loc.name, { permanent: true, direction: 'top', offset: [0, -10] })
    .bindPopup('<b>' + loc.name + '</b><hr>' + loc.description);
});

L.control.layers(underlays, overlays, { collapsed: L.Browser.mobile }).addTo(map);


// Areas
const areas_l = JSON.parse(localStorage.getItem('areas'));

areas_l.forEach(area => {
  L.polygon(area.coords, { color: area.color, fillOpacity: 0.5, weight: 4 })
    .bindPopup('<b>' + area.name + '</b><hr>' + area.description)
    .addTo(overlays['<img src="./assets/icons/Area.svg" class="layerControlEmoji"> Áreas']);
});



// Live Coordinates
map.on('mousemove', function (e) {
  document.getElementById('coords').innerHTML = 'Lat: ' + Math.round(e.latlng.lat) + ' Lon: ' + Math.round(e.latlng.lng);
});

map.on('click', function (e) {
  if (e.originalEvent.shiftKey) {
    const { lat, lng } = e.latlng;
    const text = Math.round(lat) + ', ' + Math.round(lng);
    navigator.clipboard.writeText(text);
    toast('Copiado: ' + text);
  }
})

map.on('baselayerchange', function (e) {
  localStorage.setItem('underlay', e.name);
})


// UTILS
function toast(msg, type = 'info') {
  document.querySelectorAll('.toast').forEach(t => t.remove());

  type = String(type).toLowerCase();

  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.classList.add('toast-' + type);

  const t_msg = document.createElement('p');
  t_msg.textContent = msg;

  toast.appendChild(t_msg);
  document.getElementById('t-c').appendChild(toast);

  setTimeout(() => toast.remove(), 4000);
}