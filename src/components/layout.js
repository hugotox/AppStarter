import React, { Component } from 'react'
import Head from 'next/head'
import skeleton from '../styles/skeleton.min.css'

class Layout extends Component {
  state = {
    visible: false
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({visible: true})
    }, 1)
  }

  render() {
    const {children, title = 'My App'} = this.props
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <style dangerouslySetInnerHTML={{__html: skeleton}}/>
        </Head>
        <div className={'animated ' + (this.state.visible ? 'visible' : '')}>
          {children}
        </div>
        <style jsx>{
          //language=CSS
          `
          .animated {
            opacity: 0;
            transition: all 200ms ease-in;
          }
          .visible {
            opacity: 1;
          }
          `
        }</style>
      </div>
    )
  }
}

export default Layout
