import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class Dots extends Component {
  constructor() {
    super()
    this.state = {
      controllerClassName: 'controller-unit',
      isCenter: false,
      isInverse: false
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

  isInverse(key) {
    const { activeIndex } = this.props
    const { isInverse } = this.state
    if (key === activeIndex && isInverse) {
      return true
    }
    return false
  }

  isBack() {
    this.setState({
      isInverse: !this.state.isInverse
    })
  }

  render() {
    const { dataList } = this.props
    const { controllerClassName } = this.state
    return (
      <nav className="controller-nav">
        {
          dataList.map((item, key) => {
            return <span className={controllerClassName + (this.isCenter(key) ? ' is-center' : '') + (this.isInverse(key) ? ' is-inverse' : '')} key={key} onClick={this._handleClick.bind(this, key)} />
          })
        }
      </nav>
    )
  }

  _handleClick(key) {
    const { resetActive, activeIndex, setImgFigureBack } = this.props
    if (activeIndex === key) {
      this.isBack()
      setImgFigureBack()
    } else {
      this.setState({
        isInverse: false
      })
      resetActive(key)
    }
  }
}

export default Dots
