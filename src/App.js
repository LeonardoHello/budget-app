import { useState, useEffect, useRef} from 'react';
import Container from './components/Container';
import Buttons from './components/Buttons';
import Budget from './components/Budget';
import Input from './components/Input';
import './index.css';

const App = () => {
	const [budgets, setBudgets] = useState([]);
	const dispAddBudg = useRef();
	const dispAddExsp = useRef();
	
	// localStorage.clear()
  console.log(JSON.parse(localStorage.getItem('key')));
	
	useEffect(() => {
		if (JSON.parse(localStorage.getItem('key')) === null) {
			localStorage.setItem('key', JSON.stringify([]))
		}
		setBudgets(JSON.parse(localStorage.getItem('key')))
	}, [])

  const settingBudgets = () => {
			setBudgets(prevBudgets => [...prevBudgets, {budgetName: localStorage.getItem('budgetName'), expenseLimit: localStorage.getItem('expenseLimit'), expenses: []}]);
			localStorage.setItem('key', JSON.stringify([...budgets, {budgetName: localStorage.getItem('budgetName'), expenseLimit: localStorage.getItem('expenseLimit'), expenses: []}]))
	};

	const unclickableBackground = () => {
		[...document.getElementsByClassName('h-buttons')].forEach(elem => elem.style.pointerEvents = 'none');
	};

	// Button props
	const displayingBudg = () => {
		dispAddBudg.current.style.display = 'flex';
	  unclickableBackground();
	}
	const displayingExsp = () => {
		dispAddExsp.current.style.display = 'flex';
		unclickableBackground();
	}

  const exit = () => {
    dispAddBudg.current.style.display = 'none';
    dispAddExsp.current.style.display = 'none';
		// making background clickable again
    [...document.getElementsByClassName('h-buttons')].forEach(elem => elem.style.pointerEvents = 'unset');
    [...document.querySelectorAll('input')].map(elem => elem.value = null);
  }

	// Budget prop
  const budgetData = () => {
    if (document.getElementById('name').value !== '' && document.getElementById('limit').value !== '') {
      localStorage.setItem('budgetName', document.getElementById('name').value);
      localStorage.setItem('expenseLimit', document.getElementById('limit').value);
      settingBudgets();
		  console.log(JSON.parse(localStorage.getItem('key')));
      exit();
    };
  }
	const expenseData = () => {
    if (document.getElementById('description').value !== '' && document.getElementById('amount').value !== '' && document.getElementById('select').value !== '') {
			const updatingExpenses = JSON.parse(localStorage.getItem('key'));
			updatingExpenses.forEach(elem => {
				if (elem.budgetName === document.getElementById('select').value) {
					elem.expenses.push({
						expenseName: document.getElementById('description').value,
						expenseAmount: document.getElementById('amount').value
					})
				}
			})
			setBudgets(updatingExpenses)
			localStorage.setItem('key', JSON.stringify(updatingExpenses))
			exit();
		};
  };

	// Expense prop
	const UpdatingDeletedExpenses = () => {
		setBudgets(JSON.parse(localStorage.getItem('key')))
	}

  return <>
		<Budget setRef={dispAddBudg} heading='New Budget' setId='adding-budget' data={budgetData} exit={exit} css='block' >
			<Input labelText='Name' forAndId='name' type='text'/>
			<Input labelText='Expense limit' forAndId='limit' type='text'/>
		</Budget>

		<Budget setRef={dispAddExsp} heading='New Expense' setId='adding-expense' data={expenseData} exit={exit}>
			<Input labelText='Description' forAndId='description' type='text'/>
			<Input labelText='Amount' forAndId='amount' type='text'/>
			<div id='inputs'>
				<label htmlFor="select">Budget</label>
				<select id="select">
					{localStorage.getItem('key') !== null ? JSON.parse(localStorage.getItem('key')).map((elem, index) => <option key={index} label={elem.budgetName} value={elem.budgetName}/>) : null}
				</select>
			</div>
		</Budget>

		<header>
			<h1 id='h'>Budget</h1>
			<Buttons lBtnText='Add Budget' rBtnText='Add Expense' lBtnClass='add-budget' rBtnClass='add-expense' leftBtnClick={displayingBudg} rightBtnClick={displayingExsp}/>
		</header>

		<main>
			{budgets !== null ? budgets.map((elem, index) => <Container key={index} budgetName={elem.budgetName} expenseLimit={elem.expenseLimit} unclickableBackground={unclickableBackground} UpdatingDeletedExpenses={UpdatingDeletedExpenses} displayingExsp={displayingExsp}/>) : null}
		</main>
	</>
}

export default App;