import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Chart from './Chart'
const App = () => {
  const [list, setList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [form, setForm] = useState({
    category: 'income',
    amount: '',
    info: '',
    date: '',
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/createpost`, form);
      console.log(response.data);
      fetchTrack();
      setForm({ category: 'income', amount: '', info: '', date: '' });
    } catch (error) {
      console.error('Error in frontend createpost:', error);
    }
  };

  const fetchTrack = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/getpost`);
      setList(response.data);
      let cost = 0;
      let inc = 0;
      let exp = 0;
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].category === "income") {
          cost += response.data[i].amount;
          inc += response.data[i].amount;
        } else {
          cost -= response.data[i].amount;
          exp += response.data[i].amount;
        }
      }
      setIncome(inc);
      setExpense(exp);
      setTotalAmount(cost);
    } catch (err) {
      console.error('Error in frontend getpost:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/deletepost/${id}`);
      fetchTrack();
    } catch (err) {
      console.error('Error in frontend deletepost:', err);
    }
  };

  useEffect(() => {
    fetchTrack();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="bg-gray-200 min-h-screen p-8 space-y-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Money Tracker App</h1>
      <div className="flex items-center space-x-16">

        <form className="space-y-4 w-96" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <span className="mr-2">Category:</span>
            <select
              className="w-48 bg-white p-2 border border-gray-300 rounded"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span className="mr-2">Amount:</span>
            <input
              type="number"
              className="w-48 p-2 border border-gray-300 rounded"
              placeholder="Enter amount..."
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="mr-2">Info:</span>
            <input
              type="text"
              className="w-48 p-2 border border-gray-300 rounded"
              placeholder="Enter info..."
              value={form.info}
              onChange={(e) => setForm({ ...form, info: e.target.value })}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="mr-2">Date:</span>
            <input
              type="date"
              className="w-48 p-2 border border-gray-300 rounded"
              value={form.date}
              min={getCurrentDate()}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="flex flex-col justify-between items-center">
            <button type="submit" className="px-3 font-bold bg-blue-400 text-white">
              Submit
            </button>
          </div>
        </form>
        {list.length > 0 ? <Chart income={income} expense={expense} /> : <></>}
      </div>

      <div className="flex flex-col items-center">
        <div className="grid grid-cols-5 gap-20 items-center py-2 text-gray-700 text-sm font-semibold w-full max-w-4xl">
          <p className="text-center">Category</p>
          <p className="text-center">Amount</p>
          <p className="text-center">Info</p>
          <p className="text-center">Date</p>
          <p className="text-center">Delete</p>
        </div>
        <hr className="w-full border-2 border-gray-400 my-2" />
        {list.map((item, index) => (
          <div key={index} className="grid grid-cols-5 gap-20 items-center py-2 text-gray-700 text-sm font-semibold w-full max-w-4xl">
            <p className="text-center">{item.category}</p>
            <p className="text-center">{item.amount}</p>
            <p className="text-center">{item.info}</p>
            <p className="text-center">{new Date(item.date).toLocaleDateString()}</p>
            <span className="flex justify-center">
              <CloseIcon onClick={() => handleDelete(item.id)} />
            </span>
          </div>
        ))}
        {list.length>0? <hr className="w-full border-2 border-gray-400 my-2" />:<></>}
        <div className="grid grid-cols-5 gap-20 items-center py-2 text-gray-700 text-sm font-semibold w-full max-w-4xl">
          <p className="text-center">Total</p>
          <p className="text-center">{totalAmount}</p>
          <p className="text-center">-</p>
          <p className="text-center">-</p>
          <p className="text-center">-</p>
        </div>
      </div>

    </div>
  );
};

export default App;
