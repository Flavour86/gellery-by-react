import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class Dots extends Component {
  constructor() {
    super()
    this.state = {
      controllerClassName: 'controller-unit',
      isCenter: false
    }
    this.PropTypes = {
      dataList: PropTypes.array.isRequired,
      activeIndex: PropTypes.number.isRequired,
      getActiveIndex: PropTypes.func.isRequired
    }
  }
  isCenter(key) {
    const { activeIndex } = this.props
    if (key === activeIndex ) {
      return true
    }
    return false
  }

  render() {
    const { dataList } = this.props
    const { controllerClassName } = this.state
    return (
      <nav className="controller-nav">
        {
          dataList.map((item, key) => {
            return <span className={controllerClassName + (this.isCenter(key) ? ' is-center' : '')} key={key} onClick={this._handleClick.bind(this, key)} />
          })
        }
      </nav>
    )
  }

  _handleClick(key) {
    const { getActiveIndex } = this.props
    getActiveIndex(key)
  }
}

export default Dots