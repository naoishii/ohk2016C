import React from 'react';

import socket from 'socket.io-client';

const so = socket('http://210.140.160.143:8080');

so.on('connect', function(){});
so.on('publish', function(data){});
so.on('disconnect', function(){});



export default class Stage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    so.on('publish', (data) => {
      console.log(data);
      let pos = {
        x: data.value.x || 120,
        y: data.value.y || 120,
        angle: data.value.angel || 0,
        door: data.value.door,
      };
      this.props.handleUpdate(pos);
    });
  }

  render() {
    let {
      position
    } = this.props;

    console.log('c', position);

    const coinStyle = {
      position: 'absolute',
      top: position.y || 0,
      left: position.x || 0,
      width: '40px',
      height: '40px',
      backgroundSize: ['100%', 'auto'],
      transform: `rotate(${position.angle / Math.PI * 180}deg)`,
      backgroundImage: 'url("https://raw.githubusercontent.com/naoishii/ohk2016/master/image/10y.gif")'
    };

    const stageStyle = {
      marginTop: '20px',
      width: '375px',
      height: '627px',
      backgroundSize: ['100%', 'auto'],
      backgroundImage: 'url("https://raw.githubusercontent.com/naoishii/ohk2016/master/image/stage.png")'
    }

    const spin1Style = {
      position: 'absolute',
      top: 180,
      left: 10,
      width: '40px',
      height: '60px',
      backgroundSize: ['100%', 'auto'],
      transform: `rotate(${-position.door}deg)`,
      transformOrigin: 'center 75%',
      backgroundImage: 'url("https://raw.githubusercontent.com/naoishii/ohk2016/master/image/spin.png")'
    };

    const spin2Style = {
      position: 'absolute',
      top: 300,
      left: 330,
      width: '40px',
      height: '60px',
      backgroundSize: ['100%', 'auto'],
      transform: `rotate(${position.door}deg) scaleX(-1)`,
      transformOrigin: 'center 75%',
      backgroundImage: 'url("https://raw.githubusercontent.com/naoishii/ohk2016/master/image/spin.png")'
    };

    const spin3Style = {
      position: 'absolute',
      top: 440,
      left: 10,
      width: '40px',
      height: '60px',
      backgroundSize: ['100%', 'auto'],
      transform: `rotate(${-position.door}deg)`,
      transformOrigin: 'center 75%',
      backgroundImage: 'url("https://raw.githubusercontent.com/naoishii/ohk2016/master/image/spin.png")'
    };

    return (
      <div style={stageStyle}>
        <div style={coinStyle}></div>
        <div style={spin1Style}></div>
        <div style={spin2Style}></div>
        <div style={spin3Style}></div>
      </div>
    );
  }
}
