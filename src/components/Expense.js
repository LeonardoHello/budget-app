const Expense = ({expenseName, expenseAmount, budgetName, UpdatingDeletedExpenses}) => {
  const fontSizeStyle = {fontSize: '1.9rem'};
  const deletingExpenses = () => {
		const copy = JSON.parse(localStorage.getItem('key'));
		const remaningExpenses = copy.filter(elem => elem.budgetName === budgetName)[0].expenses.filter(elem => elem.expenseName !== expenseName);
    copy.filter(elem => elem.budgetName === budgetName)[0].expenses = remaningExpenses
    localStorage.setItem('key', JSON.stringify(copy));
		UpdatingDeletedExpenses()
	}
  return (
    <div style={{display: 'flex', gap: '1rem'}}>
      <div id="single-expense" style={{width: '100%'}}>
        <h3 style={fontSizeStyle}>{expenseName}</h3>
        <h3 style={fontSizeStyle}>{`$${expenseAmount}`}</h3>
      </div>
      <button id="red-x" type='button' onClick={deletingExpenses}>&#10005;</button>
    </div>
  )
}

export default Expense