const ListGroup = (props) => {
  const { selectedItem, items, textProperty, valueProperty, onGenreChange } =
    props;
  return (
    <ul className="list-group">
      {items.map((item) => {
        return (
          <li
            style={{ cursor: "pointer" }}
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onGenreChange(item)}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
