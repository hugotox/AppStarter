import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import Loading from 'components/loading'
import 'components/skeleton/skeleton.min.css'
import globalStyles from 'global-styles'
import NavBar from '../navbar'
import Drawer from '../drawer'
import Footer from '../footer'

class Layout extends Component {
  static propTypes = {
    footer: PropTypes.node,
    title: PropTypes.string,
    router: PropTypes.object.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    footer: null,
    title: 'App Starter',
    children: null
  };

  state = {
    visible: false,
    loading: false
  };

  componentDidMount () {
    this._mounted = true
    setTimeout(() => {
      this.setState({ visible: true })
    }, 1)
    // show loading only if new route takes more than 200 ms
    Router.onRouteChangeStart = (url) => {
      if (url.split('?')[0] !== this.props.router.asPath.split('?')[0]) {
        setTimeout(() => {
          if (this._mounted) {
            this.setState({ loading: true })
          }
        }, 200)
      }
    }
  }

  componentWillUnmount () {
    this._mounted = false
  }

  render () {
    const { children, title, footer } = this.props
    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>

        <NavBar />

        <div className={'animated ' + (this.state.visible ? 'visible' : '')}>
          {this.state.loading ? <Loading />
            : children}
        </div>

        <Footer>{footer}</Footer>

        <Drawer />

        <style jsx>{ // language=CSS
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
        }
        </style>

        <style jsx global>{globalStyles}</style>
      </div>
    )
  }
}

export default withRouter(Layout)
