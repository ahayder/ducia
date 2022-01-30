import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { useState } from "react";
import Posts from "./components/Posts";

const Feed = () => {
  const { selectedCategory } = useMoralisDapp();
  const [showAddPost, setShowAddPost] = useState(false);

  let result = null;

  if (selectedCategory["category"] === "default") {
    result = (
      <div className="col-lg-9">
        <h3>Choose a Category</h3>
      </div>
    );
  } else {
    result = <Posts />;
  }

  return result;
};

export default Feed;
