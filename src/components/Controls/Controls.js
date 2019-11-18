// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './Controls.module.css';

class Controls extends Component {
  static propTypes = {
    onDeposit: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired,
  };

  state = {
    amount: '',
  };

  handleChange = e => {
    const amount = e.target.value;
    this.setState({ amount });
  };

  reset = () => {
    this.setState({
      amount: '',
    });
  };

  handleDeposit = () => {
    this.props.onDeposit(this.state.amount);
    this.reset();
  };

  handleWithdraw = () => {
    this.props.onWithdraw(this.state.amount);
    this.reset();
  };

  render() {
    const { amount } = this.state;
    return (
      <section className={styles.wrapper}>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={this.handleChange}
          className={styles.input}
        />
        <button
          className={styles.buttons}
          type="button"
          onClick={this.handleDeposit}
        >
          Deposit
        </button>
        <button
          className={styles.buttons}
          type="button"
          onClick={this.handleWithdraw}
        >
          Withdraw
        </button>
      </section>
    );
  }
}

export default Controls;
