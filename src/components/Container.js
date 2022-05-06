import { useRef } from "react";
import Buttons from './Buttons';
import Expense from './Expense';
import Budget from './Budget';
import PriceRange from './PriceRange';
import Progress from './Progress';

const Container = ({budgetName, expenseLimit, unclickableBackground, UpdatingDeletedExpenses, displayingExsp}) => {
	const dispBudgExsp = useRef();
	const exit = () => {
    dispBudgExsp.current.style.display = 'none';
		// making background clickable again
    [...document.getElementsByClassName('h-buttons')].forEach(elem => elem.style.pointerEvents = 'unset');
    [...document.querySelectorAll('input')].map(elem => elem.value = null);
  };
	// button props
  const viewingExpenses = () => {
		dispBudgExsp.current.style.display = 'flex';
		unclickableBackground();
	};


	return (
		<div className='container' style={{backgroundColor: (!budgetName ? 'gray' : 'white')}}>
			<PriceRange budgetName={budgetName || 'Uncategorized'}  expenseLimit={expenseLimit || '0'}/>
			<Progress budgetName={budgetName}/>
			<Buttons rightBtnClick={viewingExpenses} leftBtnClick={displayingExsp} budgetName={budgetName}/>
			<Budget setRef={dispBudgExsp} heading={budgetName} setId='budget-expenses' exit={exit} addBtnCss='none' xBtnCss='block' UpdatingDeletedExpenses={UpdatingDeletedExpenses}>
				{JSON.parse(localStorage.getItem('key')) !== null ? JSON.parse(localStorage.getItem('key')).filter(elem => elem.budgetName === budgetName)[0].expenses.map((elem, index) => <Expense key={index} expenseName={elem.expenseName} expenseAmount={elem.expenseAmount} budgetName={budgetName} UpdatingDeletedExpenses={UpdatingDeletedExpenses}/>) : null}
			</Budget>
		</div>
	)
}
  
export default Container