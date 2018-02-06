import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Modal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
  }

  static defaultProps = {
    visible: false
  }

  contentClick = e => {
    e.stopPropagation()
  }

  render() {
    const {visible, children, onClose} = this.props
    return (
      <div className={visible ? 'modal-wrapper visible' : 'modal-wrapper'} onClick={onClose}>
        <div className="modal-content" onClick={this.contentClick}>
          {children}
        </div>
        <style jsx>{/*language=CSS*/
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
              background-color: rgba(100,100,100,0.3);
            }

            .visible {
              opacity: 1;
              visibility: visible;
            }

            .modal-content {
              background-color: white;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border: solid 1px #ccc;
              padding: 20px 40px;
            }
          `
        }</style>
      </div>
    )
  }
}

export default Modal
