/*
 * Re do map object app to support view model controller....
 * Angular $cope must be able to pass information in to the map object
 * example:
 *
 * 1. map.setLocation() // inter address / city to set map center
 * 2. map.setSearch() // insert name / address to get results
 *
 */

var locations = [
	{
		'name' 		: 'Space Needle',
		'address' 	: '400 Broad St,',
		'cityState'	: 'Seattle, WA'
	},
	{
		'name' 		: 'Pike Place Market',
		'address' 	: '',
		'cityState'	: 'Seattle, WA'
	},
	{
		'name' 		: 'Pioneer Square',
		'address' 	: '',
		'cityState'	: 'Seattle, WA'
	},
	{
		'name' 		: 'Kerry Park',
		'address' 	: '211 W Highland Dr,',
		'cityState'	: 'Seattle, WA'
	},
	{
		'name' 		: 'Boeing Tour',
		'address' 	: '8415 Paine Field Blvd,',
		'cityState'	: 'Mukilteo, WA'
	}
];


var Map = function(){
	var thiz = this;
	// map stuff
	thiz.gmap = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 47.6149938, lng: -122.2915567},
		zoom: 15
	});
	thiz.infowindow = new google.maps.InfoWindow({
		content: '',
		maxWidth:200
	});
	thiz.geocoder = new google.maps.Geocoder();
	thiz.service = new google.maps.places.PlacesService(thiz.gmap);
	thiz.bounds = new google.maps.LatLngBounds();

	// data
	thiz.placeDetails =[];
	thiz.markers = [];
	thiz.mapCenter = null;

	// search param
	thiz.searchLocation = '台北松江路125號',
	thiz.query = '診所',
	thiz.request = {
		location: '',
		radius : 500,
		type: ['health'],
		query: thiz.query
	};

	// Starts here
	thiz.setSearchArea(locations);
}

Map.prototype = {
	setSearchArea : function(areaName){
		var thiz = this;

		for(var i=0; i< areaName.length; i++){
			var address = areaName[i].address + ' ' + areaName[i].cityState;
			console.log(address);

			thiz.geocoder.geocode({'address' : address}, function(results, status){
				if(status === 'OK'){

					//console.log(results[0].place_id);

					thiz.getPlaceDetails(results[0].place_id);

				}else{
					alert("Geocode was not successful for the following reason: " + statu)
				}
			})
		}
	},

	getPlaceDetails : function(placeId){
		var thiz = this;

		thiz.service.getDetails({
			placeId: placeId
		}, function(place, status){
			if(status === google.maps.places.PlacesServiceStatus.OK){
				thiz.placeDetails.push(place);
				thiz.createMarker(place);
			}
		});
	},

	createMarker : function(place){
		var thiz = this;

		var contentString = '<div id="content">' +
			'<div class"siteNotice">' +
			'</div>' +
			'<h1 class="firstHeading">' + place.name + '</h1>' +
			'<div class="bodyContent">'+
			'<p><b>Address: </b></p>' +
			'<p>' + place.adr_address + '</p>' +
			'<p><b>Phone Number: </b></p>' +
			'<p>' + place.formatted_phone_number + '</p>' +
			'<p><b>Website: </b></p>' +
			'<p>' + place.website + '</p>' +
			'</div>';

		var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: thiz.gmap,
          position: placeLoc
        });

        thiz.markers.push(marker);

        // extend the bounds to include each marker position
        thiz.bounds.extend(marker.position); // current boundaires of the map

        // marker.addListener('click', function(){
        //   thiz.infowindow.setContent(contentString);
        //   thiz.infowindow.open(thiz.gmap, thiz);
        // });

		google.maps.event.addListener(marker, 'click', function(){
			thiz.infowindow.setContent(contentString);
			thiz.infowindow.open(thiz.gmap, thiz);
		});

        thiz.gmap.fitBounds(thiz.bounds);

        //console.log(bounds);


	}

}

var map;
var initMap = function(){
	map = new Map();

};

/*
function Person(first, last, age) {
  thiz.first = first;
  thiz.last = last;
  thiz.age = age;
}
Person.prototype = {
  getFullName: function() {
    alert(thiz.first + ' ' + thiz.last);
  },
  greet: function(other) {
    alert("Hi " + other.first + ", I'm " + »
    thiz.first + ".");
  }
};
*/