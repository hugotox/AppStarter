import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { closeDrawer } from './actions';
import { logout } from '../auth/actions';

class Drawer extends Component {
  static propTypes = {
    drawerOpen: PropTypes.bool.isRequired,
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null
  }

  constructor(props) {
    super(props);
    this.state = {
      open: props.drawerOpen,
      closing: false
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.drawerOpen && nextProps.drawerOpen) {
      this.setState({ open: true, closing: false });
    } else if (this.props.drawerOpen && !nextProps.drawerOpen) {
      this.setState({ closing: true });
      setTimeout(() => {
        if (this._mounted) {
          this.setState({ open: false, closing: false });
        }
      }, 600);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleClose = () => {
    this.props.dispatch(closeDrawer());
  };

  handleLogout = () => {
    this.props.dispatch(logout());
    this.handleClose();
  };

  gotoLogin = () => {
    this.handleClose();
    // little trick to not close the drawer instantly when routing to /login
    setTimeout(() => {
      Router.push('/login');
    }, 300);
  };

  render() {
    const { open, closing } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div
          className={'overlay ' + (open ? 'overlayOpen ' : ' ') + (closing ? 'overlayClosing' : '')}
          onClick={this.handleClose}
        >
        </div>
        <div className={'drawer ' + (open && !closing ? 'open ' : ' ')}>
          <div className="title">
            <i className="fa fa-arrow-left u-pull-right" onClick={this.handleClose}></i>
            <h5>App Starter</h5>
            <div>
              {user ?
                <div>
                  <div>
                    {user && user.first_name && <span className="link">Welcome {user.first_name} </span>}
                  </div>
                  <div className="link" onClick={this.handleLogout}> Logout</div>
                </div>
                :
                <div onClick={this.gotoLogin}>Login</div>
              }
            </div>
          </div>
        </div>
        <style jsx>{ // language=CSS
            `
            .overlay {
              position: fixed;
              background-color: #9e9e9e;
              opacity: 0;
              top: 0;
              left: 0;
              bottom: 0;
              transition: opacity 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            .overlayOpen {
              right: 0;
              opacity: 0.2;
            }

            .overlayClosing {
              right: 0;
              opacity: 0;
            }

            .drawer {
              background-color: white;
              width: 80%;
              height: 100%;
              position: fixed;
              top: 0;
              left: -80%;
              padding: 20px;
              transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            .open {
              left: 0;
            }
          `
        }
        </style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  drawerOpen: state.drawer.drawerOpen,
  user: state.auth.user
});

export default connect(mapStateToProps)(Drawer);
