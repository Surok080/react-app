import React from 'react';
import View from '../views/Login/index';

interface Props {
  navigate: any,
}

interface IState {
  email: any,
  password: any,
  status: any,
  alerMessage: any,
  errorReg: any,
}

export default class LoginController extends React.Component<Props, IState> {

  state = {
    email: '',
    password: '',
    status: true,
    alerMessage: '',
    errorReg: false,
  };

  private handleChange = (value: string, nameState: string) => {
    this.setState({ [nameState]: value } as Pick<IState, keyof IState>);
    this.setState({ errorReg: false });
    this.setState({ alerMessage: '' });
  };

  private handleSubmit = (e: any) => {
    const regExpEmail = /\S+@\S+\.\S+/;
    const urlLog = 'https://internsapi.public.osora.ru/api/auth/login';

    e.preventDefault();
    this.setState({ status: false });
    this.setState({ errorReg: false });
    this.setState({ alerMessage: '' });

    if (!regExpEmail.test(this.state.email)) {
      this.loginReg();
      this.setState({ alerMessage: 'ERROR-email' });
      this.setState({ errorReg: true });
      return;
    }

    this.loginApiUser(this.setStateUser(), urlLog);
  };

  private loginApiUser = (userData: any, urlLog: string) => {
    fetch(urlLog, {
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
          this.props.navigate("/");
          alert('Вы залогинились')
          localStorage.setItem('Access_token', JSON.stringify(data.data.access_token));
        } else {
          this.loginReg();
          this.setState({ alerMessage: data.errors });
          this.setState({ errorReg: true });
        }
      });
  };

  private setStateUser = () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    return data;
  };

  private loginReg = () => {
    this.setState({ status: true });
    this.setState({ email: '' });
    this.setState({ password: '' });
  };

  goToRegistration = () => {
    this.props.navigate("/registration");
  };

  render() {
    return (
      <View
        navigate={this.props.navigate}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        goToRegistration={this.goToRegistration}
        state={this.state}
      />
    );
  }
}
