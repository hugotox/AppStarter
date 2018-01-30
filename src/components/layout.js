import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Router from 'next/router'
import NavBar from './navbar'
import Footer from './footer'
import skeleton from '../styles/skeleton.min.css'

class Layout extends Component {
  state = {
    visible: false,
    loading: false
  }

  static propTypes = {
    footer: PropTypes.node
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({visible: true})
    }, 1)
    // todo: show loading only if new route takes more than X seconds
    Router.onRouteChangeStart = () => this.setState({loading: true})
    Router.onRouteChangeComplete = () => this.setState({loading: false})
    Router.onRouteChangeError = () => this.setState({loading: false})
  }

  render() {
    const {children, title = 'My App', footer} = this.props
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
          <style dangerouslySetInnerHTML={{__html: skeleton}}/>
        </Head>

        <NavBar/>

        <div className={'animated ' + (this.state.visible ? 'visible' : '')}>
          {this.state.loading ? <div className="container" style={{textAlign: 'center'}}>
              Loading... <i className="fa fa-circle-notch fa-spin"></i>
            </div>
            :
            children}
        </div>

        <Footer>{footer}</Footer>

        <style jsx>{ //language=CSS
            `
            .animated {
              opacity: 0;
              transition: all 200ms ease-in;
              padding-top: 20px;
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
