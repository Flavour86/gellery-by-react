import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class ImgFigure extends Component {
  constructor() {
    super()
    this.state = {
      imgFigureClassName: 'img-figure',
      dataList: [],
      isBack: false
    }
    this.PropTypes = {
      dataList:PropTypes.array.isRequired,
      stageW: PropTypes.number.isRequired,
      stageH: PropTypes.number.isRequired,
      activeIndex: PropTypes.number.isRequired
    }
  }

  componentWillMount() {
    const { dataList } = this.props
    this.setState({
      dataList: dataList
    })
  }

  componentDidMount() {
    const { stageW, stageH, activeIndex } = this.props
    const {dataList} = this.state
    this.resetItemList(dataList, activeIndex, stageW, stageH)
  }

  resetItemList(data, active, stageW, stageH) {
    if (!data) return
    const imgWidth = this.refs.imgFigure0.scrollWidth,
          imgHeight = this.refs.imgFigure0.scrollHeight;
    const leftInterval = {
      x: {
        min: 0,
        max: stageW/2 - imgWidth*2
      },
      y: {
        min: 0,
        max: stageH - imgHeight
      }
    }
    const rightInterval = {
      x: {
        min: stageW/2 + imgWidth,
        max: stageW - imgWidth
      },
      y:{
        min: 0,
        max: stageH - imgHeight
      }
    }
    const centerInterval = {
      x: {
        min: stageW/2 - imgWidth,
        max: stageW/2 + imgWidth/2
      },
      y:{
        min: 0,
        max: stageH/2 - imgHeight
      }
    }
    console.log(active)
    let centerPos = this.getCenterPos(data, active);
    let topPos = this.getRangeArrNum(data,2);
    let leftPos = this.getRangeArrNum(data, Math.ceil(data.length / 2));
    let rightPos = data;
    this.getItemPosi(topPos, centerInterval)
    this.getItemPosi(leftPos, leftInterval)
    this.getItemPosi(rightPos, rightInterval)
    if (centerPos.length !==0) {
      centerPos[0].style = {
        left: stageW/2 - imgWidth/2 + 'px',
        top: stageH/2 + 'px',
        zIndex: '10'
      }
    }
    const newData = [...centerPos,...topPos,...leftPos,...rightPos]
    this.setState({
      dataList: newData
    })
  }

  getCenterPos(data, current) {
    if (!data) return
    const temp = []
    for(let i = 0;i<data.length;i++){
      if (data[i].id === current) {
        temp.push(data[i])
        data.splice(i,1)
      }
    }
    return temp
  }

  getRangeRotate() {
    return (Math.random() > 0.5 ? '-' : '') + Math.ceil(Math.random()*30)
  }

  getItemPosi(data, pos) {
    if (!data.length || !pos) return;
    data.map(item => {
      const rotate = this.getRangeRotate()
      item.style = {
        left: this.getRangeNum(pos.x.min, pos.x.max) + 'px',
        top: this.getRangeNum(pos.y.min, pos.y.max) + 'px',
        transform: `rotate(${rotate}deg)`,
        zIndex: '0'
      }
    })
  }

  getRangeArrNum(arr, num) {
    let temp = [];
    for(let i=0;i<num;i++) {
      let index = this.getRangeNum(0, arr.length-1);
      temp = temp.concat(arr.splice(index, 1))
    }
    return temp
  }

  getRangeNum(low, high) {
    return Math.ceil(Math.random() * (high - low) + low)
  }

  selectHandle(key) {
    const { activeIndex, getActiveIndex, stageW, stageH } = this.props;
    const { dataList } = this.state;
    console.log(key, activeIndex)
    if (key === activeIndex) {
      this.setState({
        isBack: !this.state.isBack
      })
    } else {
      getActiveIndex(key)
      this.resetItemList(dataList, key, stageW, stageH)
    }
  }
  isCenter(key) {
    const { activeIndex } = this.props
    let { isBack } = this.state;
    if (key === activeIndex && isBack) {
      return true
    }
    return false
  }

  render() {
    let {imgFigureClassName, dataList} = this.state;
    if (dataList.length ===0 ) {
      return  null
    }
    return (
      <section className="img-sec">
        {
          dataList.map((item, key) => {
            console.log(item)
            return (
              <figure className={imgFigureClassName + (this.isCenter(item.id) ? ' is-inverse' : '')} key={key} ref={`imgFigure${key}`} style={item.style} onClick={this.selectHandle.bind(this, item.id)}>
                <img src={item.imageUrl}
                     alt={item.title}
                />
                <figcaption>
                  <h2 className="img-title">{item.title}</h2>
                  <div className="img-back">
                    <p>{item.desc}</p>
                  </div>
                </figcaption>
              </figure>
            )
          })
        }
      </section>
    )
  }
}

export default ImgFigure
