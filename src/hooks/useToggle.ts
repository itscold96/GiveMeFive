import { useReducer } from 'react';

export interface ToggleActionType {
  type: 'switch' | 'on' | 'off';
}

const toggleReducer = (state: boolean, action: ToggleActionType) => {
  switch (action.type) {
    case 'switch':
      return !state;
    case 'on':
      return true;
    case 'off':
      return false;
    default:
      throw new Error('잘못된 action type 입니다.');
  }
};

export const useToggle = () => {
  const [toggleValue, toggleDispatch] = useReducer(toggleReducer, false);

  return { toggleValue, toggleDispatch };
};
