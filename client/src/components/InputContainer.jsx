const InputContainer = (props) => {
  return (
    <div className="input-container">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        onChange={props.onChange}
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
      />
      {props.errors && <span className="span-errors">{props.errors}</span>}
    </div>
  );
};

export default InputContainer;
