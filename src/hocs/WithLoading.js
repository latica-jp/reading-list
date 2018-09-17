import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';

const withLoadingWrapper = WrappedComponent => {
  return class WithLoading extends Component {
    render() {
      return (
        // ・<View> に style を適用し忘れて表示されず、さんざんハマる
        // ・<Spinner> の前に this.props.loading && を付加しているのは
        // 　react-native-loading-spinner-overlay が Alert と同時使用すると消えなくなる現象への workaround
        //   https://github.com/joinspontaneous/react-native-loading-spinner-overlay/issues/30#issuecomment-417699195
        <View style={{ flex: 1 }}>
          {this.props.loading && <Spinner visible={this.props.loading} />}
          <WrappedComponent {...this.props} />
        </View>
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
