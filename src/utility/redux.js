export const createReducer = (initialState) => {
  const handlers = {};
  const reducer = (state = initialState, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

  reducer.addCase = (action, handler) => {
    handlers[action.type] = handler;

    return reducer;
  };

  return reducer;
};
