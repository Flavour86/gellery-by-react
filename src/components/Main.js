import React from 'react';
import ImgFigure from './imgFigure'
import imageDatas from '../data/imageDatas.js';
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

  getItemImgUrl(path, data) {
    if (!data) return
    data.map((item, key) => {
      item.imageUrl = path + item.fileName

    })
     this.setState({
       dataList: data
     })
  }

  componentDidMount() {
    const stageW = this.refs.stage.scrollWidth;
    const stageH = this.refs.stage.scrollHeight;
    this.setState({
      stageW: stageW,
      stageH: stageH
    })
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
            stageW={stageW}
            stageH={stageH}
            dataList={dataList}
            activeIndex={activeIndex}
          />
        </section>
      </div>
    );
  }
}

export default AppComponent;
