// Core
import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => (
  <section className={styles.wrapper}>
    <span className={styles.income}>+ {income} </span>
    <span className={styles.expenses}> - {expenses}</span>
    <span className={styles.balance}>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
};

export default Balance;
