import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';

interface wEHState {
  errorMessage: string;
}

const withErrorHandler = <P extends {}>(
  WrappedComponent: React.ComponentType,
  axios: AxiosInstance
) => {
  return class extends Component<P, wEHState> {
    reqInterceptor!: number;
    resInterceptor!: number;

    state = {
      errorMessage: '',
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ errorMessage: '' });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error: Error) => this.setState({ errorMessage: error.message })
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    closeModalHandler = () => this.setState({ errorMessage: '' });

    render() {
      return (
        <>
          <Modal
            show={this.state.errorMessage ? true : false}
            closeModalHandler={this.closeModalHandler}
          >
            {this.state.errorMessage ? this.state.errorMessage : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
