import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';

const withLoadingWrapper = WrappedComponent => {
  return class WithLoading extends Component {
    render() {
      return (
        // 修正履歴：View -> View で style に {flex: 1} を付加 → React.Fragment
        // flex: 1 を入れないと WrappedComponent が表示されない →
        // flex: 1 は表示に余計な影響が生じた →（いろいろ悩んで）React.Fragment で解決
        <React.Fragment>
          {this.props.loading && <Spinner visible={this.props.loading} />}
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

const withLoading = (WrappedComponent, requestNames) => {
  const mapStateToProps = state => {
    const loading = requestNames.some(
      requestName => state.loading[requestName]
    );
    return { loading };
  };
  return connect(mapStateToProps)(withLoadingWrapper(WrappedComponent));
};

export default withLoading;
