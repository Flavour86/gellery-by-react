import React from 'react'
import ReactDOM from 'react-dom'
import ImgFigure from './imgFigure'
import imageDatas from '../data/imageDatas.js'
import Dots from './dots'
import '../styles/App.css'

class AppComponent extends React.Component {
  constructor() {
    super()
    this.path = '../images/';
    this.state = {
      dataList: [],
      activeIndex: 0,
      stageW: 0,
      stageH: 0
    }
    this.mouseScrolling = false
  }

  componentWillMount() {
    this.getItemImgUrl(this.path, imageDatas)
  }

  componentDidMount() {
    const { activeIndex } = this.state
    this.getStageWidth()
    this._domResize(activeIndex)
    this._mouseScroll()
  }

  getStageWidth() {
    const stageW = this.refs.stage.scrollWidth;
    const stageH = this.refs.stage.scrollHeight;
    this.setState({
      stageW: stageW,
      stageH: stageH
    })
  }

  getItemImgUrl(path, data) {
    if (!data) return
    data.map((item, key) => {
      item.imageUrl = require(`images/${item.fileName}`)
    })
     this.setState({
       dataList: data
     })
  }

  getActiveIndex(index) {
    this.setState({
      activeIndex: index
    })
    this._domResize(index)
  }

  resetActive(index) {
    this.getActiveIndex(index);
    this.refs.ImgFigure.resetItemList(index)
  }

  imgFigureIsBack() {
    this.refs.ImgFigure.isBack()
  }

  dotsBack() {
    this.refs.dots.isBack()
  }

  render() {
    const { dataList, stageW, stageH, activeIndex } = this.state
    if (stageW ===0 || stageH===0) {
      return (
        <div className="content">
          <section className="stage" ref="stage">
            暂无数据
          </section>
        </div>
      )
    }
    return (
      <div className="content">
        <section className="stage" ref="stage">
          <ImgFigure
            ref="ImgFigure"
            stageW={stageW}
            stageH={stageH}
            dataList={dataList}
            activeIndex={activeIndex}
            getActiveIndex={this.getActiveIndex.bind(this)}
            setDotsBack={this.dotsBack.bind(this)}
          />
          <Dots
            ref="dots"
            dataList={dataList}
            activeIndex={activeIndex}
            resetActive={this.resetActive.bind(this)}
            setImgFigureBack={this.imgFigureIsBack.bind(this)}
          />
        </section>
      </div>
    )
  }

  _domResize(activeIndex) {
    window.addEventListener('resize', () => {
      this.getStageWidth()
      this.refs.ImgFigure.resetItemList(activeIndex)
    }, false)
  }

  getDeleyTime(styleName, element) {
    if (!styleName || !element) return
    let tmp = ''
    if (window.getComputedStyle) {
      tmp = window.getComputedStyle(element, null)[styleName]
    }
    if(tmp.trim().length) {
      tmp = tmp.match(/\d+(\.\d+)?/g)[0] * 1000
    }
    return tmp
  }

  _mouseScroll() {
    let {activeIndex, dataList } = this.state
    const len = dataList.length
    const userAgent = window.navigator.userAgent;
    const type = userAgent.indexOf('Firefox') > -1 ? 'DOMMouseScroll' : 'mousewheel'
    document.addEventListener(type, (event) => {
      if (this.mouseScrolling) return
      this.mouseScrolling = true
      if (event.detail) {
        if (event.detail > 0) {
          activeIndex++
        } else {
          activeIndex--
        }
      } else {
        if (event.deltaY > 0) {
          activeIndex++
        } else {
          activeIndex--
        }
      }
      activeIndex = (activeIndex > len -1) ? 0 : ((activeIndex < 0) ? len -1 : activeIndex)
      this.refs.ImgFigure.resetItemList(activeIndex)
      this.setState({
        activeIndex: activeIndex
      })
      var itemElement = this.refs.ImgFigure.refs.imgFigure0
      const duration = this.getDeleyTime('transition-duration', itemElement)
      const delay = this.getDeleyTime('transition-delay', itemElement)
      setTimeout(() => {
        this.mouseScrolling = false
      },(duration + delay))
    }, false)
  }
}

export default AppComponent;
