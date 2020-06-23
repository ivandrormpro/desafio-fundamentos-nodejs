import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    this.balance.income = this.transactions.reduce((soma, item) => {
      if (item.type === 'income') {
        // eslint-disable-next-line no-param-reassign
        soma += item.value;
      }
      return soma;
    }, 0);

    this.balance.outcome = this.transactions.reduce((soma, item) => {
      if (item.type === 'outcome') {
        // eslint-disable-next-line no-param-reassign
        soma += item.value;
      }
      return soma;
    }, 0);

    this.balance.total = this.balance.income - this.balance.outcome;

    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
