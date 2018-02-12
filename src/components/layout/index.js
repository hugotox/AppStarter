import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Router from 'next/router'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import NavBar from '../navbar'
import Footer from '../footer'
import skeleton from './styles/skeleton.min.css'
import globalStyles from '../../global-styles'

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
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <script src="https://use.fontawesome.com/d599b86078.js"></script>
          <style dangerouslySetInnerHTML={{__html: skeleton}}/>
        </Head>

        <NavBar/>

        <div className={'animated ' + (this.state.visible ? 'visible' : '')}>
          {this.state.loading ? <div className="container" style={{textAlign: 'center'}}>
              Loading... <i className="fa fa-circle-o-notch fa-spin"></i>
            </div>
            :
            children}
        </div>

        <Footer>{footer}</Footer>

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

export default connect()(withRouter(Layout))
