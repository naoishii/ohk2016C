import React from 'react';

export default class Stage extends React.Component {
  constructor() {
    super();
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
