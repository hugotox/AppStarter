import React, { Component } from 'react'
import styles from './styles'

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
        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default Footer
