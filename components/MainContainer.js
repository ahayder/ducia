import { useMoralisQuery } from "react-moralis";
import Categories from "./Categories";
import Feed from "./Feed";
import { Layout } from "antd";
import Account from "./Account";

const { Header } = Layout;

const styles = {
	content: {
	  display: "flex",
	  justifyContent: "center",
	  fontFamily: "Roboto, sans-serif",
	  color: "#041836",
	  marginTop: "130px",
	  padding: "10px",
	},
	header: {
	  position: "fixed",
	  zIndex: 1,
	  width: "100%",
	  background: "#fff",
	  display: "flex",
	  justifyContent: "space-between",
	  alignItems: "center",
	  fontFamily: "Roboto, sans-serif",
	  borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
	  padding: "0 10px",
	  boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
	},
	headerRight: {
	  display: "flex",
	  gap: "20px",
	  alignItems: "center",
	  fontSize: "15px",
	  fontWeight: "600",
	},
  };

const MainContainer = () => {
  const queryCategories = useMoralisQuery("Categories");
  const fetchedCategories = JSON.parse(
    JSON.stringify(queryCategories.data, ["categoryId", "category"])
  );

  console.log(fetchedCategories);
  return (
    <>
      <Header style={styles.header}>
        <h4>Decentradit</h4>
        <div style={styles.headerRight}>
          <Account />
        </div>
      </Header>
      <div className="container">
        <div
          style={{
            display: "flex",
            fontFamily: "Roboto, sans-serif",
            color: "#041836",
            padding: "10px 30px",
            maxWidth: "1200px",
            width: "100%",
            gap: "20px",
          }}
        >
          <Categories categories={fetchedCategories} />
          <Feed />
        </div>
      </div>
    </>
  );
};

export default MainContainer;
