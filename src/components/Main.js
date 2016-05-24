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
    this.resetItemList(this.path, imageDatas)
  }

  resetItemList(path, data) {
    if (!data) return
    data.map(item => {
      item.imageUrl = path + item.fileName
    })
     this.setState({
       dataList: data
     })
  }

  getImgFigure(data) {
    if (!data) return null
    let tempArr = []
    let imgFigureClassName = 'img-figure';
    let styleObj = {
    }
    data.map((item, key) => {
      tempArr.push(<figure className={imgFigureClassName} key={key} style={styleObj}>
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
        <section className="stage">
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
