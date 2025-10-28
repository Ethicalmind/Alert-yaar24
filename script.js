// SOS Button Functionality
document.getElementById('sosBtn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      document.getElementById('location').innerHTML =
        `📍 Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)} <br>
         Copy this and send to security or friends!`;
      alert("SOS alert sent! Share your location with trusted contacts.");
    });
  } else {
    alert("Geolocation not supported by your browser.");
  }
});

// Anonymous Report Submission
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycb.../exec"; // REPLACE WITH YOUR ACTUAL WEB APP URL

document.getElementById('reportForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitMsg = document.getElementById('submitMsg');

  submitMsg.innerText = "Submitting report...";

  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      submitMsg.innerText = "✅ Report submitted anonymously!";
      form.reset();
    } else {
      submitMsg.innerText = "❌ Error submitting report. Please try again.";
    }
  } catch (error) {
    console.error('Error:', error);
    submitMsg.innerText = "❌ An error occurred. Please check your connection.";
  }
});

// Google Maps Integration
let map;
let userMarker;
const DEFAULT_CENTER = { lat: 28.9905, lng: 77.7065 };

const PLACES = [
  { title: "Poojan Girls PG - Saket",            pos: { lat: 28.9916, lng: 77.7041 } },
  { title: "Gurukul Girls Hostel - Vijay Nagar", pos: { lat: 28.9930, lng: 77.7075 } },
  { title: "Aanchal Girls PG - Surya Nagar",     pos: { lat: 28.9892, lng: 77.7092 } },
  { title: "Janki Devi Girls Hostel",            pos: { lat: 28.9880, lng: 77.7080 } },
  { title: "TP Nagar Police Station",            pos: { lat: 28.9920, lng: 77.7130 } },
  { title: "Anand Hospital - Shastri Nagar",     pos: { lat: 28.9873, lng: 77.7144 } },
  { title: "Meerut City Railway Station",       pos: { lat: 28.9843, lng: 77.7059 } }
];

function initMap() {
  map = new google.maps.Map(document.getElementById('googleMap'), {
    center: DEFAULT_CENTER,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  const infoWindow = new google.maps.InfoWindow();
  PLACES.forEach(p => {
    const isPolice = /police|station|choki|sp/i.test(p.title);
    const icon = isPolice
      ? { path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale: 5, fillColor: '#1e88e5', fillOpacity: 1, strokeWeight: 1 }
      : { path: google.maps.SymbolPath.CIRCLE, scale: 6, fillColor: '#d81b60', fillOpacity: 0.9, strokeWeight: 1 };

    const m = new google.maps.Marker({ position: p.pos, map, title: p.title, icon });
    m.addListener('click', () => {
      infoWindow.setContent(`<strong>${p.title}</strong>`);
      infoWindow.open(map, m);
    });
  });

  const sosBtn = document.getElementById('sosBtn');
  if (sosBtn) sosBtn.addEventListener('click', setCurrentLocation);
}

function placeUserMarker(lat, lng) {
  const pos = { lat, lng };
  if (!userMarker) {
    userMarker = new google.maps.Marker({
      position: pos,
      map,
      title: 'Your location',
      icon: { path: google.maps.SymbolPath.CIRCLE, scale: 7, fillColor: '#ff5722', fillOpacity: 0.9, strokeWeight: 1 }
    });
  } else {
    userMarker.setPosition(pos);
  }
  map.panTo(pos);
  map.setZoom(Math.max(map.getZoom(), 15));
}

function setCurrentLocation() {
  const locationEl = document.getElementById('location');
  if (!navigator.geolocation) {
    locationEl.textContent = 'Geolocation not supported.';
    return;
  }
  locationEl.textContent = 'Locating…';
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      locationEl.textContent = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`;
      if (map) placeUserMarker(lat, lng);
    },
    err => {
      locationEl.textContent = 'Unable to retrieve location. Allow location access.';
      console.error('geolocation error', err);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

// handle simple report form
document.addEventListener('DOMContentLoaded', () => {
  const reportForm = document.getElementById('reportForm');
  if (reportForm) {
    reportForm.addEventListener('submit', e => {
      e.preventDefault();
      document.getElementById('submitMsg').textContent = 'Report submitted (demo).';
      reportForm.reset();
    });
  }
});