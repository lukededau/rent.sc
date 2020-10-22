import React, {Component} from 'react';

const textStyle = {
  textAlign: "center"
}

export class PageNotFound extends Component {
  render(){
    return (
      <div>
        <h1 style={textStyle}>404 Not Found</h1>
      </div>
    );
  }
}

export default PageNotFound;