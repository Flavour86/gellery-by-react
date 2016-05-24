import React from 'react';
import imageDatas from '../data/imageDatas.js';
import '../styles/App.css'

class AppComponent extends React.Component {
  constructor() {
    super()
    this.path = '../images/';
    this.state = {
      dataList: [],
      activeIndex: 0
    }
  }

  componentWillMount() {
    this.getItemImgUrl(this.path, imageDatas)
  }

  getItemImgUrl(path, data) {
    if (!data) return
    data.map((item, key) => {
      const rotate = this.getRangeRotate();
      item.imageUrl = path + item.fileName
      if (key === this.state.activeIndex) {
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
       dataList: data
     })
  }

  componentDidMount() {
    this.resetItemList(this.state.dataList, this.state.activeIndex)
  }

  resetItemList(data, active) {
    if (!data) return
    const stageWidth = this.refs.stage.scrollWidth,
           stageHeight = this.refs.stage.scrollHeight;
    const imgWidth = this.refs.imgFigure0.scrollWidth,
           imgHeight = this.refs.imgFigure0.scrollHeight;
    const leftInterval = {
      x: {
        min: 0,
        max: stageWidth/2 - imgWidth*2
      },
      y: {
        min: 0,
        max: stageHeight - imgHeight
      }
    }
    const rightInterval = {
      x: {
        min: stageWidth/2 + imgWidth,
        max: stageWidth - imgWidth
      },
      y:{
        min: 0,
        max: stageHeight - imgHeight
      }
    }
    const centerInterval = {
      x: {
        min: stageWidth/2 - imgWidth,
        max: stageWidth/2 + imgWidth/2
      },
      y:{
        min: 0,
        max: stageHeight/2 - imgHeight
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
      centerPos[0].style.left = stageWidth/2 - imgWidth/2 + 'px'
      centerPos[0].style.top = stageHeight/2 + 'px'
    }
    const newData = [...centerPos,...topPos,...leftPos,...rightPos]
    this.setState({
      dataList: newData
    })
  }

  getItemPosi(data, pos) {
    if (!data.length || !pos) return;
    data.map(item => {
      item.style.left = this.getRangeNum(pos.x.min, pos.x.max) + 'px'
      item.style.top = this.getRangeNum(pos.y.min, pos.y.max) + 'px'
    })
  }
  getRangeRotate() {
    return (Math.random() > 0.5 ? '-' : '') + Math.ceil(Math.random()*45)
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

  getImgFigure(data) {
    if (!data) return null
    let tempArr = []
    let imgFigureClassName = 'img-figure';
    data.map((item, key) => {
      tempArr.push(<figure className={imgFigureClassName} key={key} ref={`imgFigure${key}`} style={item.style}>
        <img src={item.imageUrl}
             alt={item.title}
        />
        <figcaption>
          <h2 className="img-title">{item.title}</h2>
          <div className="img-back">
            <p>{item.desc}</p>
          </div>
        </figcaption>
      </figure>)
    })

    return tempArr
  }

  render() {
    const { dataList } = this.state
    const imgFigure = this.getImgFigure(dataList)
    return (
      <div className="content">
        <section className="stage" ref="stage">
          <section className="img-sec">
            {imgFigure}
          </section>
        </section>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
