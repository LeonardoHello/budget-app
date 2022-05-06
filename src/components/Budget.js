const Budget = ({heading, setId, data, exit, children, addBtnCss, xBtnCss, setRef, UpdatingDeletedExpenses}) => {
  const removingBudget = () => {
    const copy = JSON.parse(localStorage.getItem('key'));
    const newCopy = copy.filter(elem => elem.budgetName !== heading);
    localStorage.setItem('key', JSON.stringify(newCopy))
    UpdatingDeletedExpenses(newCopy)
    exit()
  }
  return (
    <div id={setId} ref={setRef}>
      <div className='new-budget'>
        <div style={{display: 'flex', gap: '1.5rem'}}>
          <h1>Expenses - {heading}</h1>
          <button onClick={removingBudget} style={{color: 'red', border: '1px solid red', fontSize: '1.8rem', fontWeight: '300', padding: '0 1rem', letterSpacing: '0.1rem', display: xBtnCss}}>DELETE</button>
        </div>
        <button onClick={exit}>&#10005;</button>
      </div>
      <form>
        {children}
			  <button id='add' type="button" onClick={data} style={{display: addBtnCss}}>Add</button>
      </form>
    </div>
  )
}

Budget.defaultProps = {
  xBtnCss: 'none'
}

export default Budget