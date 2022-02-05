/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiMTFqZW0iLCJhIjoiY2t5d210aXh6MGE0NTJucWlqMmh3OWludiJ9.TBKIP1Kg1E4h1x10T2WFXg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/11jem/ckyx2kv97001b14nlv1jkjaq3',
    scrollZoom: false,
    // center: [-118.243683, 34.052235],
    // zoom: 4,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';

    // Adding markers
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Adding popups
    new mapboxgl.Popup({
      offset: 30,
      focusAfterOpen: false,
      // closeButton: false,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
