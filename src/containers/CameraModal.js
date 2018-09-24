import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content } from 'native-base';
import { Camera, Permissions } from 'expo';

import BarCodeReader from '../components/BarCodeReader';
import BookInfoModal from '../components/BookInfoModal';

import { WithLoading } from '../hocs';

import { fetchBookData, clearSummary } from '../store/actions';

class CameraModal extends Component {
  // ここは Expo ドキュメントのサンプルどおり
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    scannerEnabled: false,
  };

  async componentWillMount() {
    // ここもサンプルどおりに実装
    // 許可が取得できなかった場合にOSの設定を促したいが、native モジュールを使う必要があり、expoでは無理
    // react-native-permission など
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
      scannerEnabled: true,
    });
  }

  onBarCodeRead = async ({ data: isbn }) => {
    // 書籍には2段のISBNコードがついている；1段目のみ受け付ける
    // 同じ書籍がスキャン済みの場合は無視する
    // またバーコードスキャンは継続的に行われるので、書籍検索が終了するまでスキャンを停止
    if (
      !this.state.scannerEnabled ||
      isbn.substr(0, 3) !== '978' ||
      this.props.summaries.find(summary => summary.isbn === isbn)
    )
      return;
    this.setState({ scannerEnabled: false });
    // この fetchBDData が非同期なのに、呼び出し元のこちらに async / await つけ忘れて動作せず、しばらく悩んだ
    await this.props.fetchBookData(isbn);
  };

  // 書籍情報を閉じたらスキャン再開
  onModalBackdropPress = () => {
    this.props.clearSummary();
    this.setState({ scannerEnabled: true });
  };

  onPressClose = () => {
    if (this.props.loading) return;
    const { navigation } = this.props;
    navigation.pop();
  };

  render() {
    const { hasCameraPermission } = this.state;
    const reader = hasCameraPermission ? (
      <BarCodeReader
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        {...this.props}
        onBarCodeRead={this.onBarCodeRead}
        type={this.state.type}
        onPressClose={this.onPressClose}
      />
    ) : null;
    // BookInfoMotal の isVisible のみだと
    // onModalBackdropPress で summary を消したときに、一瞬内容が空で表示されるため、
    // 表示そのものを消す
    const bookInfoModal = this.props.summary !== '' && (
      <BookInfoModal
        isVisible={this.props.summary !== ''}
        summary={this.props.summary}
        onBackdropPress={this.onModalBackdropPress}
      />
    );
    // Content は contentContainerStyle でスタイル指定
    return (
      <Container>
        <Content scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
          {bookInfoModal}
          {reader}
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    summary: state.book.summary,
    summaries: state.book.summaries,
  };
};

export default connect(
  mapStateToProps,
  { fetchBookData, clearSummary }
)(WithLoading(CameraModal, ['FETCH_BOOKDATA']));
