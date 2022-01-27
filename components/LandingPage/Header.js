

const Header = () => {
    const repeater = 300;
  return (
    <>
        <div className="wrap">
            <ul className="uordList">
                {Array(repeater).map((_, i) => {
                    <li key={i} className="list p"></li>
                })}
            </ul>
            </div>
  </>
  );
};

export default Header;
