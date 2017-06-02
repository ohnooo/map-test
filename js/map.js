//*************** Map ***************//


console.log("start");


	/**
	* called after google map is loaded
	* create the map
	*/
var Map = function() {

    var self = this;
    self.geocoder = new google.maps.Geocoder();
    console.log(self.geocoder);    // => returns google geocoder

    this.start();
}

Map.prototype = {
    start: function(){
         console.log( self.geocoder );    //  undefined
  //        self.geocoder.geocode({'address' : areaName}, function(results, status){
		// 	if(status === 'OK'){
		// 		console.log("processing");

		// 	}else{
		// 		alert("Geocode was not successful for the following reason: " + statu)
		// 	}
		// })
    }
}






var map
var initMap = function(){
	map = new Map();
	//MapApp.testView();
	// Start ViewModel to make sure it initialize after Google map loads
	//ko.applyBindings(new ViewModel(MapApp));

	//ko.applyBindings(vm);
};


