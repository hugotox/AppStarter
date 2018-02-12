import React, { Component } from 'react'
import { connect } from 'react-redux'
import theme from '../../config/theme'
import { closeDrawer } from './actions'

class Drawer extends Component {
  handleClose = () => {
    this.props.dispatch(closeDrawer())
  }

  render() {
    const { drawerOpen } = this.props
    return (
      <div className={'drawer ' + (drawerOpen ? 'open' : '')}>
        <div className="title">
          Menu
          <i className="fa fa-arrow-left u-pull-right" onClick={this.handleClose}></i>
        </div>
        <style jsx>{//language=CSS
          `
            .drawer {
              background-color: white;
              width: 80%;
              height: 100%;
              position: fixed;
              top: 0;
              left: -80%;
              padding: 20px;
              transition: left 200ms ease-in-out;
            }

            .open {
              left: 0;
            }
          `
        }</style>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    drawerOpen: state.drawer.drawerOpen
  }
}

export default connect(mapStateToProps)(Drawer)
