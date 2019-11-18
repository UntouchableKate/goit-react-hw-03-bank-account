export const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

export const get = key => {
  try {
    const transactions = localStorage.getItem(key);
    const balance = localStorage.getItem(key);
    const parsedTransactions = JSON.parse(transactions, balance);

    return transactions ? parsedTransactions : null;
  } catch (error) {
    console.log(error);
  }
};
