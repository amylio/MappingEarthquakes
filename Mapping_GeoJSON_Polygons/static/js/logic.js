// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satellitestreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellight Streets": satellitestreets
};

// Create the map object with center and zoom level.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the neighborhood GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/amylio/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);

var myStyle = {
  fillColor: "#ffffa1",
  color: "blue",
  weight: 1
};
  
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  style: myStyle,
  onEachFeature: function(feature,layer){
    console.log(layer);
    layer.bindPopup("<h4> Neighborhood: " + feature.properties.AREA_NAME +"</h4>");
      }
}).addTo(map);

});

//SKILL DRILL:Edit your logic.js file with the following changes:

//Make the lines blue, with a weight of 1.
//Make the polygon fill color yellow.
//Add a popup to show each neighborhood.
//Make the default map layer Streets with Satellite Streets the second option.