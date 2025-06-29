import React, { useEffect, useState, useMemo } from 'react';
import { fetchTransactions } from '../services/api';
import { type Transaction } from '../types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'dashboard' | 'transactions'>('dashboard');

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Calculate stats dynamically
  const { balance, revenue, expenses, savings } = useMemo(() => {
    let revenue = 0;
    let expenses = 0;
    transactions.forEach(tx => {
      if (tx.category.toLowerCase() === 'revenue') {
        revenue += tx.amount;
      } else if (tx.category.toLowerCase() === 'expense') {
        expenses += tx.amount;
      }
    });
    const balance = revenue - expenses;
    const savings = balance; // You can adjust this logic if you have a different savings formula
    return {
      balance,
      revenue,
      expenses,
      savings,
    };
  }, [transactions]);

  // Use emoji or SVG for icons
  const stats = [
    { label: 'Balance', value: balance, icon: '💰' },
    { label: 'Revenue', value: revenue, icon: '💵' },
    { label: 'Expenses', value: expenses, icon: '💸' },
    { label: 'Savings', value: savings, icon: '🏦' },
  ];

  // Prepare chart data for LineChart
  const chartData = useMemo(() => {
    // Group transactions by month and sum income/expenses
    const data: { [key: string]: { income: number; expenses: number } } = {};
    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      if (!data[month]) {
        data[month] = { income: 0, expenses: 0 };
      }
      if (tx.category.toLowerCase() === 'revenue') {
        data[month].income += tx.amount;
      } else if (tx.category.toLowerCase() === 'expense') {
        data[month].expenses += tx.amount;
      }
    });
    // Convert to array sorted by month (optional: sort by date)
    return Object.entries(data)
      .map(([month, values]) => ({ month, ...values }))
      .sort((a, b) => {
        // Sort by year and month
        const [aMonth, aYear] = a.month.split(' ');
        const [bMonth, bYear] = b.month.split(' ');
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return (
          parseInt('20' + aYear) - parseInt('20' + bYear) ||
          months.indexOf(aMonth) - months.indexOf(bMonth)
        );
      });
  }, [transactions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-root">
      <aside className="sidebar">
        <div className="logo">Penta</div>
        <nav>
          <ul>
            <li
              className={view === 'dashboard' ? 'active' : ''}
              onClick={() => setView('dashboard')}
            >
              Dashboard
            </li>
            <li
              className={view === 'transactions' ? 'active' : ''}
              onClick={() => setView('transactions')}
            >
              Transactions
            </li>
            <li>Wallet</li>
            <li>Analytics</li>
            <li>Personal</li>
            <li>Message</li>
            <li>Setting</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header>
          <h1>{view === 'dashboard' ? 'Dashboard' : 'Transactions'}</h1>
          <input className="search" placeholder="Search..." />
          <div className="profile"></div>
        </header>
        {view === 'dashboard' && (
          <>
            <section className="stats-row">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value">${stat.value.toLocaleString()}</div>
                </div>
              ))}
            </section>
            <section className="overview-row">
              <div className="overview-chart">
                <div className="overview-header">Overview</div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#00ff99" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" stroke="#ffaa00" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="recent-transactions">
                <div className="recent-header">
                  Recent Transaction <span className="see-all">See all</span>
                </div>
                <ul>
                  {transactions.slice(0, 5).map((tx) => (
                    <li key={tx.id}>
                      <img src={tx.user_profile || ''} alt={tx.userId} />
                      <div>
                        <div className="tx-type">Transfers</div>
                        <div className="tx-name">{tx.userId}</div>
                      </div>
                      <div className={`tx-amount ${tx.amount >= 0 ? 'positive' : 'negative'}`}>{tx.amount >= 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="transactions-section">
              <div className="transactions-header">
                <h2>Transactions</h2>
                <input className="search" placeholder="Search for anything..." />
                <span className="date-range">10 May - 20 May</span>
              </div>
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map((tx) => (
                    <tr key={tx.id}>
                      <td>
                        <img src={tx.user_profile || ''} alt={tx.userId} className="tx-img" />
                        {tx.userId}
                      </td>
                      <td>{new Date(tx.date).toLocaleDateString()}</td>
                      <td className={tx.category === 'Revenue' ? 'positive' : 'negative'}>
                        {tx.category === 'Revenue'
                          ? `+$${tx.amount.toFixed(2)}`
                          : `-$${tx.amount.toFixed(2)}`}
                      </td>
                      <td>
                        <span className={`status-chip ${tx.status.toLowerCase()}`}>{tx.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
        {view === 'transactions' && (
          <section className="transactions-section">
            <div className="transactions-header">
              <h2>All Transactions</h2>
              <input className="search" placeholder="Search for anything..." />
            </div>
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <img src={tx.user_profile || ''} alt={tx.userId} className="tx-img" />
                      {tx.userId}
                    </td>
                    <td>{new Date(tx.date).toLocaleDateString()}</td>
                    <td className={tx.category === 'Revenue' ? 'positive' : 'negative'}>
                      {tx.category === 'Revenue'
                        ? `+$${tx.amount.toFixed(2)}`
                        : `-$${tx.amount.toFixed(2)}`}
                    </td>
                    <td>
                      <span className={`status-chip ${tx.status.toLowerCase()}`}>{tx.status}</span>
                    </td>
                    <td>{tx.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;