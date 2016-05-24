import React, { Component, PropTypes } from 'react'

class ImgFigure extends Component {
  constructor() {
    super()
    this.state = {
      imgFigureClassName: 'img-figure',
      dataList: []
    }
    this.PropTypes = {
      dataList:PropTypes.array.isRequired,
      stageW: PropTypes.number.isRequired,
      stageH: PropTypes.number.isRequired,
      activeIndex: PropTypes.number.isRequired
    }
  }

  componentWillMount() {
    const { dataList, activeIndex } = this.props
    dataList.map((item, key) => {
      const rotate = this.getRangeRotate()
      if (key === activeIndex) {
        item.style = {
          transform: 'rotate(0)'
        }
      } else {
        item.style = {
          transform: `rotate(${rotate}deg)`
        }
      }
    })
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
    let centerPos = data.splice(active, 1);
    let topPos = this.getRangeArrNum(data,1);
    let leftPos = this.getRangeArrNum(data, Math.ceil(data.length / 2));
    let rightPos = data;
    this.getItemPosi(topPos, centerInterval)
    this.getItemPosi(leftPos, leftInterval)
    this.getItemPosi(rightPos, rightInterval)
    if (centerPos.length !==0) {
      centerPos[0].style.left = stageW/2 - imgWidth/2 + 'px'
      centerPos[0].style.top = stageH/2 + 'px'
    }
    const newData = [...centerPos,...topPos,...leftPos,...rightPos]
    this.setState({
      dataList: newData
    })
  }

  getRangeRotate() {
    return (Math.random() > 0.5 ? '-' : '') + Math.ceil(Math.random()*45)
  }

  getItemPosi(data, pos) {
    if (!data.length || !pos) return;
    data.map(item => {
      item.style.left = this.getRangeNum(pos.x.min, pos.x.max) + 'px'
      item.style.top = this.getRangeNum(pos.y.min, pos.y.max) + 'px'
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

  render() {
    let {imgFigureClassName, dataList} = this.state;
    if (dataList.length ===0 || !dataList[0].style.left || !dataList[0].style.top) {
      return (
        <section className="img-sec">
          <figure className={imgFigureClassName} ref='imgFigure0' />
        </section>
      )
    }
    return (
      <section className="img-sec">
        {
          dataList.map((item, key) => {
            return (
              <figure className={imgFigureClassName} key={key} ref={`imgFigure${key}`} style={item.style}>
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
