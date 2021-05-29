const Select = (props) => {
  const { name, label, options, error, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" name={name} id={name} {...rest}>
        <option value="" disabled selected>
          Select a Genre
        </option>
        {options.map((option) => (
          <option key={option._id} id={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger ">{error}</div>}
    </div>
  );
};

export default Select;
