import React, { Component, PropTypes } from 'react'

class ImgFigure extends Component {
  constructor() {
    super()
    this.state = {
      imgFigureClassName: 'img-figure',
      dataList: [],
      isBack: false,
      posList: []
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
    const {activeIndex } = this.props
    this.resetItemList(activeIndex)
  }

  resetItemList(active) {
    const { stageW, stageH } = this.props
    const {dataList} = this.state
    if (!dataList) return
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
    const centerTopInterval = {
      x: {
        min: stageW/2 - imgWidth,
        max: stageW/2 + imgWidth/2
      },
      y:{
        min: 0,
        max: stageH/2 - imgHeight
      }
    }
    let tempArr;
    const len = dataList.length;
    const Num = {
      topNum:2,
      leftNum: Math.ceil((len - 3) / 2),
      rightNum: Math.floor((len - 3) / 2)
    }
    let centerPos = {
      left: stageW/2 - imgWidth/2 + 'px',
      top: stageH/2 + 'px',
      zIndex: '10',
      id: active
    }
    let topPos = this.getItemPosi(Num.topNum,centerTopInterval);
    let leftPos = this.getItemPosi(Num.leftNum,leftInterval);
    let rightPos = this.getItemPosi(Num.rightNum,rightInterval);
    tempArr = this.rangeSortArr([...topPos,...leftPos,...rightPos])
    tempArr = this.mergeArr(tempArr, active, centerPos, len);
    this.setState({
      posList: tempArr
    })
  }

  rangeSortArr(arr) {
    if (arr.length === 0) return
    arr.map((item, key) => {
      item.id = key
    })
    var temp = arr.sort((a,b) => {
      if (Math.random() > 0.5) {
        return a.id - b.id
      }
      return b.id - a.id
    })
    return temp
  }


  getRangeRotate() {
    return (Math.random() > 0.5 ? '-' : '') + Math.ceil(Math.random()*30)
  }

  getItemPosi(num, pos) {
    if (num === 0 || !pos) return [];
    const res = []
    for (let i=0;i<num;i++) {
      const rotate = this.getRangeRotate()
      const temp = {
        left: this.getRangeNum(pos.x.min, pos.x.max) + 'px',
        top: this.getRangeNum(pos.y.min, pos.y.max) + 'px',
        transform: `rotate(${rotate}deg)`,
        zIndex: '0'
      }
      res.push(temp)
    }
    return res
  }

  mergeArr(arr, active, activeValue, lenth) {
    if (arr.length >= lenth ) return
    if (active < arr.length) {
      const temp = arr[active]
      temp.id = lenth - 1
      for(let i=0;i<arr.length;i++) {
        if (i === active) {
          arr[active] = activeValue
        }
      }
      arr.push(temp)
    } else {
      arr.push(activeValue)
    }
    return arr
  }

  getRangeNum(low, high) {
    return Math.ceil(Math.random() * (high - low) + low)
  }

  isBack() {
    this.setState({
      isBack: !this.state.isBack
    })
  }

  selectHandle(key) {
    const { activeIndex, getActiveIndex, setDotsBack} = this.props;
    if (key === activeIndex) {
      this.isBack()
      setDotsBack()
    } else {
      this.setState({
        isBack: false
      })
      getActiveIndex(key)
      this.resetItemList(key)
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
    let {imgFigureClassName, dataList, posList} = this.state;
    return (
      <section className="img-sec">
        {
          dataList.map((item, key) => {
            return (
              <figure className={imgFigureClassName + (this.isCenter(key) ? ' is-inverse' : '')} key={key} ref={`imgFigure${key}`} style={posList[key]} onClick={this.selectHandle.bind(this, key)}>
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
