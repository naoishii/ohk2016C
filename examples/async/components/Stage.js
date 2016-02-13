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
    console.log(this.props);
    so.on('publish', (data) => {
      let pos = {
        x: data.x || 120,
        y: data.y || 120
      };
      console.log('Socket');
      this.props.handleUpdate(pos);
    });
  }

  render() {
    let {
      position
    } = this.props;


    const style = {
      position: 'absolute',
      top: position.y || 0,
      left: position.x || 0
    };

    return (
      <div>
        <div style={style}>
          あ
        </div>
      </div>
    );
  }
}
