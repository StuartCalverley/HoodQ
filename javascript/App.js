import React from 'react';
var addresses = require('../addresses.json');
var Map = require('./Map');
var Map2 = require('./Map');
var Information = require('./Information');
var addressList = [];
//var Information = require('./Information.js');
var App = React.createClass ({

	/**
	 *	Initialize all the variables used in this component
	 */
	getInitialState: function() {

		//Stores the addresses from the json file in a list
		for(var i = 0; i<Object.keys(addresses).length; i++){
			addressList.push(addresses[i].address);
		}
		return {
			globalAddress: addressList,
			currentAddress1: addressList[0],
			currentAddress2: addressList[0],
			coffeeShop: addresses[0].nearestCoffeeShop,
			workDistance: addresses[0].workDistance,
			dogPark: addresses[0].nearbyDogPark,
			coffeeShop2: addresses[0].nearestCoffeeShop,
			workDistance2: addresses[0].workDistance,
			dogPark2: addresses[0].nearbyDogPark,
			priority1: "Coffee Shop",
			priority2: "Work Distance",
			priority3: "Dog Park",
			winner: "They are the same",
			//Default map cooridnates
			mapCoordinates1: {
				lat: 43.6494967,
        		lng: -79.37749170000001
			},
			mapCoordinates2: {
				lat: 43.6494967,
				lng: -79.37749170000001
			}
		};
	},	

	/**
	 * When the component updates will run this function
	 */
	componentDidUpdate: function(prevProps, prevState) {
		var num1;
		var num2;

		//Converts the distance into a numerical form
		if(this.state.workDistance.includes("km")) {
			num1 = this.state.workDistance.split(/[k]/)[0]*1000;
		} else {
			num1 = this.state.workDistance.split(/[m]/)[0]*1;
		}
		if(this.state.workDistance2.includes("km")) {
			num2 = this.state.workDistance2.split(/[k]/)[0]*1000;
		} else {
			num2 = this.state.workDistance2.split(/[m]/)[0]*1;
		}

		//Checks to make sure that none of the priorities are the same if they are will not calculate which address is better
		if((this.state.priority1 != this.state.priority2 && this.state.priority1 != this.state.priority3) && (this.state.priority2 != this.state.priority3)) {
			//Checks to make sure address1 and address2 are set to values
			if(this.state.currentAddress1 != "" && this.state.currentAddress2 != "") {
				//Checks to make sure all the priorities are set
				if(this.state.priority1 != "" && this.state.priority2 != "" && this.state.priority3 != "") {
					//Will only enter this statement is atleast one of the values is different from last time this function was called 
					if(this.state.currentAddress1 != prevState.currentAddress1 || this.state.currentAddress2 != prevState.currentAddress2 || this.state.priority1 != prevState.priority1 || this.state.priority2 != prevState.priority2 || this.state.priority3 != prevState.priority3) {
						var points1 = 0;
						var points2 = 0;

						//This section is where I calculate which address is the better based off of priority 
						if(this.state.priority1 == "Coffee Shop") {
							//Checks if address 1 has a tim hortons
							if(this.state.coffeeShop == "Tim Hortons") {
								points1 += 3;
							//If address 1 has a starbucks and address 2 does not have a timmies then for sure we can say that address1 will get points added to its score
							} else if(this.state.coffeeShop  == "Starbucks" && this.state.coffeeShop2 != "Tim Hortons") {
								points1 += 3;
							}
							if(this.state.coffeeShop2 == "Tim Hortons") {
								points2 += 3;
							} else if(this.state.coffeeShop2  == "Starbucks" && this.state.coffeeShop1 != "Tim Hortons") {
								points2 += 3;
							}
						}
						if(this.state.priority1 == "Work Distance") {
							//Here I check which work distance is closer only one address will be given points and if they are a tie no points will be awarded
							if(num1 > num2) {
								points2 += 3;
							} else if(num2 > num1) {
								points1 += 3;
							} 
						}
						if(this.state.priority1 == "Dog Park") {
							if(this.state.dogPark == "yes") {
								points1 += 3;
							}
							if(this.state.dogPark2 == "yes") {
								points2 += 3;
							}
						}
						if(this.state.priority2 == "Coffee Shop") {
							if(this.state.coffeeShop == "Tim Hortons") {
								points1 += 2;
							} else if(this.state.coffeeShop  == "Starbucks" && this.state.coffeeShop2 != "Tim Hortons") {
								points1 += 2;
							}
							if(this.state.coffeeShop2 == "Tim Hortons") {
								points2 += 2;
							} else if(this.state.coffeeShop2  == "Starbucks" && this.state.coffeeShop1 != "Tim Hortons") {
								points2 += 2;
							}
						}
						if(this.state.priority2 == "Work Distance") {
							if(num1 > num2) {
								points2 += 2;
							} else if(num2 > num1) {
								points1 += 2;
							} 
						}
						if(this.state.priority2 == "Dog Park") {
							if(this.state.dogPark == "yes") {
								points1 += 2;
							}
							if(this.state.dogPark2 == "yes") {
								points2 += 2;
							}
						}
						if(this.state.priority3 == "Coffee Shop") {
							if(this.state.coffeeShop == "Tim Hortons") {
								points1 += 1;
							} else if(this.state.coffeeShop  == "Starbucks" && this.state.coffeeShop2 != "Tim Hortons") {
								points1 += 1;
							}
							if(this.state.coffeeShop2 == "Tim Hortons") {
								points2 += 1;
							} else if(this.state.coffeeShop2  == "Starbucks" && this.state.coffeeShop1 != "Tim Hortons") {
								points2 += 1;
							}
						}
						if(this.state.priority3 == "Work Distance") {
							if(num1 > num2) {
								points2 += 1;
							} else if(num2 > num1) {
								points1 += 1;
							} 
						}
						if(this.state.priority3 == "Dog Park") {
							if(this.state.dogPark == "yes") {
								points1 += 1;
							}
							if(this.state.dogPark2 == "yes") {
								points2 += 1;
							}
						}

						//Here I check which address has more points and set the text accordingly
						if(points2 > points1) {
							this.setState({
								winner: "Address 2 is the better location based off of your priorities",
							})
						} else if(points1 > points2) {
							this.setState({
								winner: "Address 1 is the better location based off of your priorities",
							})
						} else {
							this.setState({
								winner: "They are the same",
							})
						}
					}
				} else {
					console.log("Please your priorities");
				}
			} else {
				console.log("Do nothing");
			}
			//If the priorities are the same this section will run, but if nothing has changed since the last update it will not enter
		} else if(this.state.priority1 != prevState.priority1 || this.state.priority2 != prevState.priority2 || this.state.priority3 != prevState.priority3) {
			this.setState({
				winner: "All the priorities must be different",
			})
		}	
	},

	/**
	 * Function is called from Information component
	 */
	onDropdownSelected1: function(address) {

		var i = address;
		var self = this;
		GMaps.geocode({
			address: addresses[i].address,
			callback: function(results, status) {

				if(status !== 'OK') return;

				var latlng = results[0].geometry.location;

				self.setState({
					currentAddress1: addresses[i].address,
					coffeeShop: addresses[i].nearestCoffeeShop,
					workDistance: addresses[i].workDistance,
					dogPark: addresses[i].nearbyDogPark,
					mapCoordinates1: {
						lat: latlng.lat(),
						lng: latlng.lng()
					}
				});
			}
		});
	},

	

	onDropdownSelected2: function(address) {
		var i = address;
		var self = this;
		GMaps.geocode({
			address: addresses[i].address,
			callback: function(results, status) {

				if(status !== 'OK') return;

				var latlng = results[0].geometry.location;

				self.setState({
					currentAddress2: addresses[i].address,
					coffeeShop2: addresses[i].nearestCoffeeShop,
					workDistance2: addresses[i].workDistance,
					dogPark2: addresses[i].nearbyDogPark,
					mapCoordinates2: {
						lat: latlng.lat(),
						lng: latlng.lng()
					}
				});
			}
		});
	},

	//Sets the priority to what the user selected
	onRank1Change: function(e) {
		this.setState({
			priority1: e.target.value,
		})
	},

	onRank2Change: function(e) {
		this.setState({
			priority2: e.target.value,
		})
	},

	onRank3Change: function(e) {

			this.setState({
				priority3: e.target.value,
			})
		
	},

   	render() {
      return (
      	<div>
	      	<div className="row">
	      		<Information addressInfo={this.state.globalAddress} onSelect={this.onDropdownSelected1} onSelect2={this.onDropdownSelected2} />
	      	</div>

	      	<div className="row">
		        	<div className="col-sm-4">
		        				<h3>Coffee Shop: {this.state.coffeeShop}</h3>
								<h3>Distance from work: {this.state.workDistance}</h3>
								<h3>Dog park nearby: {this.state.dogPark}</h3>
		        	</div>
		        	<div className="col-sm-4">
		        	</div>
		        	<div className="col-sm-4">
		        				<h3>Coffee Shop: {this.state.coffeeShop2}</h3>
								<h3>Distance from work: {this.state.workDistance2}</h3>
								<h3>Dog park nearby: {this.state.dogPark2}</h3>
		        	</div>
	      	</div>

	      	<Map lat={this.state.mapCoordinates1.lat} lng={this.state.mapCoordinates1.lng} lat2={this.state.mapCoordinates2.lat} lng2={this.state.mapCoordinates2.lng} />

	      	<div className="row">
	      		<div className="col-sm-4">
	      			<h3>Priority 1</h3>
		      		<select onChange={this.onRank1Change}>
		      			<option>Coffee Shop</option>
		      			<option>Work Distance</option>
		      			<option>Dog Park</option>
		      		</select>
		      	</div>
		      	<div className="col-sm-4">
		      		<h3>Priority 2</h3>
		      		<select onChange={this.onRank2Change}>
		      			<option>Work Distance</option>
		      			<option>Coffee Shop</option>
		      			<option>Dog Park</option>
		      		</select>
		      	</div>
		      	<div className="col-sm-4">
		      		<h3>Priority 3</h3>
		      		<select onChange={this.onRank3Change}>
		      			<option>Dog Park</option>
		      			<option>Work Distance</option>
		      			<option>Coffee Shop</option>
		      		</select>
		      	</div>
	      	</div>	
			
	        
	        <div className="row">
	        	<div className="bestOption">
	        		<div className="test">
	        		<h1>{this.state.winner}</h1>
	        		</div>
	        	</div>
	        </div>
        </div>
      );
   }
});

module.exports = App;