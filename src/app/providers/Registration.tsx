import React from 'react';
import Controller from '../controllers/RegistrationController';

interface Props {
  navigate: any,
}

export default class Registration extends React.Component<Props> {

  render() {

    return <Controller
      navigate={this.props.navigate}
    />;
  }
}
