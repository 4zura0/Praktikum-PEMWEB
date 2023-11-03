// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

// document.getElementById("map").style.display = 'none';

var firebaseConfig = {
  apiKey: "AIzaSyBleBPb_OSlV4gdF0F7TRMI_Wpb_k2coh4",
  authDomain: "smartrodap.firebaseapp.com",
  databaseURL: "https://smartrodap-default-rtdb.firebaseio.com",
  projectId: "smartrodap",
  storageBucket: "smartrodap.appspot.com",
  messagingSenderId: "784319328432",
  appId: "1:784319328432:web:0e02849ed266267bac4b75",
  measurementId: "G-6YE21J85X0"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

const mydata = db.ref('test');
        mydata.on('value', handleSuccess, handleError);

        function handleError(error){
            console.log(error);
        };

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyaXNoNjciLCJhIjoiY2tkbWF6enB2MTZxNzJwcTNvaHc0cW1mdSJ9.WE2OQeKvRyRQA8poyoO4aQ';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [106.79, -6.24],
zoom: 13
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Masukan kata kunci...',
    zoom:20
});

map.addControl(
    geocoder
);

function handleSuccess(items){
    mymarker = items.val();
    console.log(mymarker);

    for (const feature of mymarker.pothole) {
        image_string = '<img src="' + feature.link + '" width="120" height="90" style="margin: 5px; border: 3px solid #f5ca0a; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">';
        contentString= '<h4 class="text-dark mb-0" style="font-size: 15px; text-align: center;">Pothole images</h4>' + '<h4 class="text-dark mb-0" style="font-size: 10px; text-align: center;">Pothole Number: ' + feature.id + '</h4>' + image_string;

        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
            
        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
            .setLngLat(feature.coordinates)
            .setPopup(
            new mapboxgl.Popup() // add popups
            .setHTML(contentString)
            )
            .addTo(map);
    }
};

map.setCenter([106.64, -6.37])
  
document.getElementById("map").style.display = 'block';
document.getElementById("myalert").style.display = 'none';
function myFunction() {
var x1 = document.getElementById("map");
var x2 = document.getElementById("myalert");
var y = document.getElementById("idtext");
if (x1.style.display === "none" && y.value == "Jakarta" || y.value == "jakarta" ) {
    map.setCenter([106.75, -6.24])
    x1.style.display = "block";
    x2.style.display = "none";
} 
else if (x1.style.display === "none" && y.value == "Bekasi" || y.value == "bekasi" ) {
    map.setCenter([106.79, -7.24])
    x1.style.display = "block";
    x2.style.display = "none";
}
else{
    x1.style.display = "none";
    x2.style.display = "block";
}
}