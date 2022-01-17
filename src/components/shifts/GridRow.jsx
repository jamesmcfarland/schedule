const GridRow = ({ name, shifts, id, showShift }) => {
  const handleClick = (e) => {};

  return (
    <>
      <p className="labels">{name}</p>
      {shifts.map((el, i) => {
        return (
          <button
            type="button"
            className={el === "ns" ? "shift-button-noshift" : "shift-button"}
            key={id + i}
            onClick={() => showShift(id + "-" + i)}
          >
            <p style={{ display: "inline" }}>{el === "ns" ? "+" : el}</p>
          </button>
        );
      })}
    </>
  );
};

export default GridRow;
