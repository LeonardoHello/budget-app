const Input = ({labelText, forAndId, type}) => {
  return (
    <div id="inputs">
      <label htmlFor={forAndId}>{labelText}</label>
      <input type={type} id={forAndId} required/>
    </div>
  )
}

export default Input