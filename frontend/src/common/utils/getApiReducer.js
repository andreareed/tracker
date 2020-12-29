import Immutable from 'immutable';

export const defaultState = Immutable.Map({
  loaded: false,
  loading: false,
  data: null,
  error: false,
});

export default (actionTypePrefix, dataDefault) => {
  const newDefault = !dataDefault ? defaultState : defaultState.set('data', Immutable.fromJS(dataDefault));

  return function(State, action) {
    const state = State || newDefault;

    switch (action.type) {
      case `${actionTypePrefix}_REQUEST`:
        return state.merge({
          loading: true,
          loaded: false,
        });
      case `${actionTypePrefix}_SUCCESS`:
        return state.merge({
          loading: false,
          loaded: true,
          data: Immutable.fromJS(action.json),
          error: false,
        });
      case `${actionTypePrefix}_FAILURE`:
        return state.merge({
          loading: false,
          loaded: false,
          data: null,
          error: Immutable.fromJS(action.json.message),
        });
      case `${actionTypePrefix}_RESET`:
        return newDefault;
      default:
        break;
    }

    return state;
  };
};
