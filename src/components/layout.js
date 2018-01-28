import React, { Component } from 'react'
import Head from 'next/head'
import skeleton from '../styles/skeleton.min.css'

class Layout extends Component {
  render() {
    const {children, title = 'My App'} = this.props
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <style dangerouslySetInnerHTML={{__html: skeleton}}/>
        </Head>
        {children}
      </div>
    )
  }
}

export default Layout
