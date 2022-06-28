import React from 'react';
import View from '../views/Registration/index';

interface Props {
  navigate: any,
}

interface IState {
  username: string,
  email: string,
  password: string,
  password_confirmation: string,
  status: any,
  errorReg: any,
  alerMessage: string,
}

export default class RegistrationController extends React.Component<Props, IState> {
  state = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    status: true,
    errorReg: false,
    alerMessage: '',
  };

  private handleChange = (value: string, nameState: string) => {
    this.setState({ [nameState]: value } as Pick<IState, keyof IState>);
    this.setState({ errorReg: false });
    this.setState({ alerMessage: '' });
  };

  private handleSubmit = (e: any) => {
    const urlReg = 'https://internsapi.public.osora.ru/api/auth/signup';
    const regExpEmail = /\S+@\S+\.\S+/;

    e.preventDefault();
    this.setState({ status: false });
    this.setState({ errorReg: false });
    this.setState({ alerMessage: '' });

    if (!this.state.username) {
      this.setState({ alerMessage: 'ERROR-userName' });
      this.setState({ errorReg: true });
      this.erorRegistration();
      return;
    }
    if (!regExpEmail.test(this.state.email)) {
      this.erorRegistration();
      return;
    }
    if (!this.state.password) {
      this.erorRegistration();
      return;
    }
    if (!(this.state.password === this.state.password_confirmation)) {
      this.erorRegistration();
      return;
    }

    this.registrationApiUser(this.setStateUserInfo(), urlReg);
  };

  private registrationApiUser = (userData: any, urlReg: string) => {
    fetch(urlReg, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          this.setState({ status: true });
          this.goToLogin();
        } else {
          const error = data.errors[Object.keys(data.errors)[0]];
          this.erorRegistration();
          this.setState({ alerMessage: error[Object.keys(error)[0]] });
          this.setState({ errorReg: true });
        }
      });
  };

  private erorRegistration = () => {
    this.setState({ status: true });
    this.setState({ username: '' });
    this.setState({ email: '' });
    this.setState({ password: '' });
    this.setState({ password_confirmation: '' });
  };

  private goToLogin = () => {
    this.props.navigate("/");
  };

  private setStateUserInfo = () => {
    const data = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };
    return data;
  };

  render() {

    return (
      <View
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        goToLogin={this.goToLogin}
        state={this.state}
      />
    );
  }
}

