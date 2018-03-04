import React, { Component } from 'react';
import Router from 'next/router';
import { getComponentDisplayName } from '../../utils/hoc';
import { whoAmI } from './actions';
import { PUBLIC } from './user-types';

/**
 * Higher order component for Next.js `pages` components.
 *
 * NOTE: depends of redux store. So you must use thw `withRedux` HOC before this one.
 * E.G.
 *
 * export default withRedux(initStore, mapStateToProps)(
 *   loginRequired([PUBLIC])(MyPage)
 * )
 *
 * It reads the user from the redux store or calls whoami API to verify current logged in user.
 *
 * To make a page public you have to pass PUBLIC user type as an element of the `permissions` parameter.
 * This is required to be able to show current logged in information on the first server render.
 *
 * @param permissions: array of user types required to render this page. Use PUBLIC to make the page public.
 * @returns function(ChildComponent) React component to be wrapped. Must be a `page` component.
 */
export default (permissions = []) => ChildComponent => class LoginRequired extends Component {
  static displayName = `LoginRequired(${getComponentDisplayName(
    ChildComponent
  )})`;

  static redirectToLogin(context) {
    const { isServer, req, res } = context;
    if (isServer) {
      res.writeHead(302, { Location: `/login?next=${req.originalUrl}` });
      res.end();
    } else {
      Router.push(`/login?next=${context.asPath}`);
    }
  }

  static redirectTo404(context) {
    const { isServer, res } = context;
    if (isServer) {
      res.writeHead(302, { Location: '/notfound' });
      res.end();
    } else {
      Router.push('/notfound');
    }
  }

  static userHasPermission(user) {
    const userGroups = user.groups;
    let userHasPerm = true;
    // go here only if we have specific permission requirements
    if (permissions.length > 0) {
      userHasPerm = false; // will let him pass if he has at least one permission
      for (let i = 0, l = permissions.length; i < l; i++) {
        for (let j = 0, k = userGroups.length; j < k; j++) {
          if (userGroups[j] === permissions[i]) {
            userHasPerm = true;
            break;
          }
        }
      }
    }
    return userHasPerm;
  }

  static async getInitialProps(context) {
    // public page passes the permission `PUBLIC` to this function
    const isPublicPage = permissions.indexOf(PUBLIC) !== -1;
    const { isServer, store, req } = context;
    let user = null;

    if (isServer) {
      // happens on page first load
      const { cookie } = req.headers;
      user = await store.dispatch(whoAmI(cookie));

    } else {
      // happens on client side navigation
      user = store.getState().auth.user;
    }

    if (user) {
      // mean user is logged in
      if (!isPublicPage) {
        if (!this.userHasPermission(user)) {
          this.redirectTo404(context);
        }
      }
    } else {
      // anonymous user
      if (!isPublicPage) {
        this.redirectToLogin(context);
      }
    }

    if (typeof ChildComponent.getInitialProps === 'function') {
      const initProps = await ChildComponent.getInitialProps(context);
      return initProps;
    }

    return {};
  }

  render() {
    return <ChildComponent {...this.props} />;
  }
};
