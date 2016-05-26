import React from 'react';
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
  }

  componentWillMount() {
    this.getItemImgUrl(this.path, imageDatas)
  }

  componentDidMount() {
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
      item.imageUrl = path + item.fileName
    })
     this.setState({
       dataList: data
     })
  }

  getActiveIndex(index) {
    this.setState({
      activeIndex: index
    })
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
}

export default AppComponent;
