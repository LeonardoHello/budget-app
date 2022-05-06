const Progress = ({ budgetName }) => {
	const copy = JSON.parse(localStorage.getItem('key'));
	const expenseLimit = parseInt(copy.filter(elem => elem.budgetName === budgetName)[0].expenseLimit) ;
	const expenseSum = copy.filter(elem => elem.budgetName === budgetName)[0].expenses.length !== 0 ? copy.filter(elem => elem.budgetName === budgetName)[0].expenses.map(elem => parseInt(elem.expenseAmount)).reduce((prevValue, curValue) => prevValue + curValue) : [];


	const progressWidth = 100-(expenseLimit-expenseSum)/expenseLimit*100
	return (
		<div id='progress-bar'>
      <span style={{width: `${progressWidth}%`, backgroundColor: progressWidth > 80 ? 'rgb(251, 63, 63)' : progressWidth < 20 ? 'rgb(253, 231, 108)': 'rgb(57, 107, 246)'}}></span>
    </div>
	)
}

export default Progress