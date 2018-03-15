import React, { Component } from 'react';
import PropTypes from 'prop-types';
import theme from '../../theme';

class Modal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    visible: false,
    children: null
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
  }

  contentClick = e => {
    e.stopPropagation();
  };

  render() {
    const { visible, children, onClose } = this.props;
    return (
      <div className={visible ? 'modal-wrapper visible' : 'modal-wrapper'} onClick={onClose}>
        <div className="modal" onClick={this.contentClick}>
          <div className="close" onClick={onClose}>
            ✕
          </div>
          {children}
        </div>
        <style jsx>{/* language=CSS */
          `
            .modal-wrapper {
              position: fixed;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s;
              background-color: rgba(100, 100, 100, 0.2);
            }

            .visible {
              opacity: 1;
              visibility: visible;
            }

            .modal {
              background-color: white;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              padding: 20px 40px;
            }

            .close {
              position: absolute;
              color: ${theme.colors.defaultTextColor};
              right: 10px;
              top: 5px;
              cursor: pointer;
            }
          `
        }
        </style>
      </div>
    );
  }
}

export default Modal;
