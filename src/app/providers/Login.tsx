import React from 'react';
import Controller from '../controllers/LoginController';


interface Props {
  navigate: any
}

export default class Login extends React.Component<Props> {
  render() {

    return <Controller
      navigate={this.props.navigate}
    />;
  }
}
