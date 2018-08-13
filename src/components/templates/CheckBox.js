import React, { Component } from 'react';
import './scroll.css';

class CheckBox extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (<div className="container">
      <div className="round">
        <input
          name={this.props.brandIndex2}
          value={this.props.brandId}
          type="checkbox"
          className="checkbox"
          checked={this.props.brandIndex.toString() === this.props.brandIndex2.toString()}
          onChange={this.props.handleBrandChange} id="checkbox"
        />
        <label htmlFor="checkbox" />
      </div>
    </div>);
  }
}

export default CheckBox;
