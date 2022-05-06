const Buttons = ({lBtnText, rBtnText, lBtnClass, rBtnClass, leftBtnClick, rightBtnClick, budgetName}) => {
	function updatedLeftBtnClick() {
		leftBtnClick()
		document.getElementById('select').value = budgetName;
	}
	return (
		<div className='h-buttons'>
			<button className={lBtnClass} onClick={updatedLeftBtnClick}>{lBtnText}</button>
			<button className={rBtnClass} onClick={rightBtnClick}>{rBtnText}</button>
		</div>
	)
}

Buttons.defaultProps = {
  lBtnText: 'Add Expense',
  rBtnText: 'View Expense',
	lBtnClass: 'add-expense',
	rBtnClass: 'view-expense'
}

export default Buttons