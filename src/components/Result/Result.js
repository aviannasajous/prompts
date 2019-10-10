/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Result.scss';
import Content from 'components/Content/Content';
import Loading from 'components/Loading/index';
import { API_URL } from 'config';

class Result extends Component {
  state = {
    prompt: '',
    isLoading: false,
    prompts: {}
  };

  fetchPrompts = () => {
    this.setState({ isLoading: true });
    axios.get(API_URL).then(res => {
      const { data } = res;
      this.setState({ prompts: data, isLoading: false }, () =>
        this.getPrompt()
      );
    });
  };

  getPrompt = () => {
    const { prompts } = this.state;
    const { match } = this.props;
    const id = match.params.promptId;
    const promptArray = prompts[`${id}`];
    const promptNumber = Math.floor(Math.random() * promptArray.length);
    const prompt = promptArray[promptNumber];
    this.setState({ prompt });
  };

  componentDidMount = () => {
    this.fetchPrompts();
  };

  render() {
    const { isLoading, prompt } = this.state;

    return (
      <Content title="Your prompt is,">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="result">
            <h2 className="result__text">{prompt}</h2>
            <div className="button-container">
              <Link className="button" to="/">
                go to home
              </Link>
              <button type="button" className="button" onClick={this.getPrompt}>
                get another
              </button>
            </div>
          </div>
        )}
      </Content>
    );
  }
}

export default Result;
