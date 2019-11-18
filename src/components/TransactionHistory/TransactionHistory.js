// core
import React from 'react';
import PropTypes from 'prop-types';

import shortid from 'shortid';

// styles
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ items }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th className={styles.thead}>Type</th>
        <th className={styles.thead}>Amount</th>
        <th className={styles.thead}>Date</th>
      </tr>
    </thead>

    <tbody>
      {items.map(item => (
        <tr key={shortid.generate()} className={styles.tr}>
          <td className={styles.tbody}>{item.type}</td>
          <td className={styles.tbody}>{item.amount}$</td>
          <td className={styles.tbody}>{item.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TransactionHistory;
