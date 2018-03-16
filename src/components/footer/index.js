import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './styles'

class Footer extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  render () {
    const { children } = this.props
    const year = moment().format('YYYY')
    let content
    if (children) {
      content = children
    } else {
      content = (
        <div>&copy;{year}</div>
      )
    }
    return (
      <div className='footer'>
        <div className='container'>
          {content}
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default Footer
