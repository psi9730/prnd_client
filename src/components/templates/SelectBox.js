import React from 'react'

import './styles.css'

class SelectBox extends React.Component {
  state = {
    ...this.props,
    items: this.props.items || [],
    selectedItem: {value:this.props.selectedOption, name:this.props.selectedOption},
    showItems: false,
  }
  dropDown = () => {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }))
  }

  selectItem = (item) => {
    this.props.onChange(item)
    this.setState({
      showItems: false,
    })
  }

  render () {
    return <div style={{position: 'relative',flex:1}}>
      <div className="select-box--box">
        <div className="select-box--container"  onClick={() => this.setState({showItems:!this.state.showItems})}>
          <div className="select-box--selected-item">
            { this.props.selectedOption.value}
          </div>
          <div
            className="select-box--arrow"
            onClick={this.dropDown}
          ><span className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}/></div>
        </div>
        <div
          className="select-box--items"
          style={{display: this.state.showItems ? 'block' : 'none'}}
        >
          {
            this.state.items.map(item => <div
              key={item.id}
              onClick={() => this.selectItem(item)}
              className={this.props.selectedOption === item ? 'selected' : ''}
            >
              { item.value }
            </div>)
          }
        </div>
      </div>
      <input type="hidden" name={this.state.name} value={this.props.selectedOption.id} />
    </div>
  }
}

export default SelectBox
