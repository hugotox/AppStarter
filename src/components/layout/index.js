import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Router from 'next/router'
import { withRouter } from 'next/router'
import NavBar from '../navbar'
import Drawer from '../drawer'
import Footer from '../footer'
import Loading from 'components/loading'
import globalStyles from 'global-styles'

class Layout extends Component {
  state = {
    visible: false,
    loading: false
  }

  static propTypes = {
    footer: PropTypes.node,
    title: PropTypes.string,
    router: PropTypes.object
  }

  componentDidMount() {
    this._mounted = true
    setTimeout(() => {
      this.setState({visible: true})
    }, 1)
    // show loading only if new route takes more than 200 ms
    Router.onRouteChangeStart = (url) => {
      if (url.split('?')[0] !== this.props.router.asPath.split('?')[0]) {
        setTimeout(() => {
          if (this._mounted) {
            this.setState({loading: true})
          }
        }, 200)
      }
    }
  }

  componentWillUnmount() {
    this._mounted = false
  }

  render() {
    const {children, title = 'My App', footer} = this.props
    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>

        <NavBar/>

        <div className={'animated ' + (this.state.visible ? 'visible' : '')}>
          {this.state.loading ? <Loading/>
            :
            children}
        </div>

        <Footer>{footer}</Footer>

        <Drawer/>

        <style jsx>{ //language=CSS
          `
            .animated {
              opacity: 0;
              transition: all 150ms ease-in;
              padding-top: 20px;
              min-height: 670px;
            }

            .visible {
              opacity: 1;
            }
          `
        }</style>

        <style jsx global>{globalStyles}</style>
      </div>
    )
  }
}

export default withRouter(Layout)
