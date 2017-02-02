import React from 'react';

var Information = React.createClass({

	/**
	 * Creates the dropdown list dynamically
	 */
	createSelectItems1: function() {
		let items = [];
		for(let i =0; i<=this.props.addressInfo.length; i++) {
			items.push(<option key={i} value={i}>{this.props.addressInfo[i]}</option>);
		}
		return items;
	},

	createSelectItems2: function(index) {
		let items = [];
		for(let i =0; i<=this.props.addressInfo.length; i++) {
			items.push(<option key={i} value={i}>{this.props.addressInfo[i]}</option>);			
		}
		return items;
	},

	//When a user selects an address it calls the function in App.js and passes in the address Selected
	onDropdownSelect1: function(e) {
		this.props.onSelect(e.target.value);
	},

	onDropdownSelect2: function(e) {
		this.props.onSelect2(e.target.value);
	},

	render() {
		return(
		<div>
		<div className="col-sm-4">
			<div className="addressSelect">
      		<select onChange={this.onDropdownSelect1}>
      			{this.createSelectItems1()}
      		</select>
      		</div>
         </div>
         <div className="col-sm-4">
         </div>
         <div className="col-sm-4">
         	<div className="addressSelect">
         <select onChange={this.onDropdownSelect2}>
      			{this.createSelectItems2()}
      		</select>
      		</div>
         </div>
         </div>
		);
	}
});

module.exports = Information;