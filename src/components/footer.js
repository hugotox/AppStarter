import React, { Component } from 'react'

class Footer extends Component {
  render() {
    const {children} = this.props
    let content
    if(children) {
      content = children
    } else {
      content = (
        <div>A footer is here</div>
      )
    }
    return (
      <div className="footer">
        {content}
      </div>
    )
  }
}

export default Footer
