var React = require('react');

var Map = React.createClass({


	componentDidMount(){

		// Only componentDidMount is called when the component is first added to
		this.componentDidUpdate();
	},


	componentDidUpdate(){

		//If there is no change in latitude or longitude for both address 1 or 2 then the component will not update
		if(this.lastLat == this.props.lat && this.lastLng == this.props.lng && this.lastLat2 == this.props.lat2 && this.lastLng2 == this.props.lng2){

			// The map has already been initialized at this address.
			// Return from this method so that we don't reinitialize it
			// (and cause it to flicker).
			return;
		}

		//Stores the values of the longitude and latitude in variables
		this.lastLat = this.props.lat;
		this.lastLng = this.props.lng;
		this.lastLat2 = this.props.lat2;
		this.lastLng2 = this.props.lng2

		var map = new GMaps({
			el: '#map',
			zoom: 13,
			lat: this.props.lat,
			lng: this.props.lng
		});


		map.addMarker({
			lat: this.props.lat,
			lng: this.props.lng
		});
		map.addMarker({
			lat: this.props.lat2,
			lng: this.props.lng2
		});
	},

	render(){

		return (
			<div className="map-holder">
				<div id="map" className="container"></div>
			</div>
		);
	}

});

module.exports = Map;