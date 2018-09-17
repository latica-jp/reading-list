/*
 * request ごとの loading を更新する reducer
 * postfix が REQUEST/SUCCESS/FAILED の action を検知して、action の prefix ごとに loading を保持する
 * 参考： https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
 */
const initialState = {};

export const loading = (state = initialState, action) => {
  const { type } = action;
  const matches = /(.*)_((REQUEST|SUCCESS|FAILED))/.exec(type);
  if (!matches) return state;
  const [, requestName, requestType] = matches;
  if (requestType) {
    return { ...state, [requestName]: requestType === 'REQUEST' };
  } else {
    return state;
  }
};
