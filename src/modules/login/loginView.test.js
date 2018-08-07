import React from 'react';
import { shallow, mount, render } from 'enzyme';
import LoginView from './loginViewContainer'
import { LoginActions } from './loginState'
import  reducer from '../../store/reducer'
describe('Add todo', () => {
  it('Add todo change state', () => {
    expect(reducer(
      {"form": {}, "login": {"loading": false}, "routing": {"locationBeforeTransitions": null}},
      LoginActions.loginRequest()
    )).toEqual( {"form": {}, "login": {"loading": true}, "routing": {"locationBeforeTransitions": null}})
  })
});

/*
describe('toggle todo', () => {
  it('toggle todo change state', () => {
    expect(reducer(
      [{ id:0, text:"eat dinner", completed: false}],
      toggleTodo(0)
    )).toEqual([{ id:0, text:"eat dinner", completed: true}])
  })
})
*/
