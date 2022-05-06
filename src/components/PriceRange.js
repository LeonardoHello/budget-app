const PriceRange = ({budgetName, expenseLimit}) => {
	const copy = JSON.parse(localStorage.getItem('key'));
	const expenseSum = copy.filter(elem => elem.budgetName === budgetName)[0].expenses.length !== 0 ? copy.filter(elem => elem.budgetName === budgetName)[0].expenses.map(elem => parseInt(elem.expenseAmount)).reduce((prevValue, curValue) => prevValue + curValue) : [];
	return (
		<div style={{display: 'flex', justifyContent: 'space-between', gap: '.5rem'}}>
			<div id='price-range'>
				<h3>{budgetName}</h3>
				<h3 id='expense'>${expenseSum.length === 0 ? 0 : expenseSum}</h3>
			</div>
			<p><span>/</span> ${expenseLimit}</p>
		</div>
	)
}

export default PriceRange