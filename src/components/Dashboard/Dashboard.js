// Core
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import shortid from 'shortid';

// services
import * as storage from '../../services/localStorage';

// Components
import Controls from '../Controls';
import Balance from '../Balance';
import TransactionHistory from '../TransactionHistory';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const transactions = storage.get('transactions');
    const balance = storage.get('balance');

    if (transactions) {
      this.setState({
        transactions,
        balance,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;
    if (prevState.transactions !== transactions) {
      storage.save('transactions', transactions);
      storage.save('balance', balance);
    }
  }

  handleDeposit = amount => {
    const newStateTransaction = {
      id: shortid.generate(),
      type: 'deposit',
      amount: Number(amount),
      date: new Date().toLocaleString(),
    };
    if (Number(amount) <= 0 || amount === null) {
      toast.warn('Введите сумму для проведения операции!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      this.setState(state => ({
        transactions: [...state.transactions, newStateTransaction],
        balance: Number(state.balance) + Number(amount),
      }));
      toast.success('Транзакция была успешно проведена!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  handleWithdraw = amount => {
    const newStateTransaction = {
      id: shortid.generate(),
      type: 'withdraw',
      amount: Number(amount),
      date: new Date().toLocaleString(),
    };
    if (Number(amount) > this.state.balance) {
      toast.error('На счету недостаточно средств для проведения операции!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (amount <= 0 || amount === null) {
      toast.warn('Введите сумму для проведения операции!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      this.setState(state => ({
        transactions: [...state.transactions, newStateTransaction],
        balance: Number(state.balance) - Number(amount),
      }));
      toast.success('Транзакция была успешно проведена!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  handleSumTransaction = type => {
    return this.state.transactions.reduce(
      (acc, transaction) => {
        return {
          ...acc,
          [transaction.type]: acc[transaction.type] + transaction.amount,
        };
      },
      { deposit: 0, withdraw: 0 },
    );
  };

  render() {
    const { balance, transactions } = this.state;
    const { deposit, withdraw } = this.handleSumTransaction();

    return (
      <div>
        <Controls
          onDeposit={this.handleDeposit}
          onWithdraw={this.handleWithdraw}
        />
        <Balance balance={balance} income={deposit} expenses={withdraw} />
        <TransactionHistory items={transactions} />
        <ToastContainer />
      </div>
    );
  }
}

export default Dashboard;
