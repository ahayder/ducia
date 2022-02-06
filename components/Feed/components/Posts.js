import { useMoralisDapp } from "../../../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery } from "react-moralis";
import Post from "./Post";
import { duciaConfig } from "../../../ducia-config";

const Posts = () => {
  const { selectedCategory } = useMoralisDapp();

  const queryPost = useMoralisQuery(
    "Posts",
    (query) => query.equalTo("categoryId", selectedCategory["categoryId"]),
    [selectedCategory],
    { live: true }
  );

  const fetchedPosts = JSON.parse(
    JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])
  ).reverse();
  const havePosts = fetchedPosts.length > 0 ? true : false;

  const addValidationScore = () => {
    if (havePosts) {
      for(let i = 0; i < fetchedPosts.length; i++) {
        fetchedPosts[i]["validationScore"] = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
      }
    }
  }

  let accountsWithRandomValidationScore = duciaConfig;
  const mockValidationScoreForUsers = () => {
    if (havePosts) {
      for(let i = 0; i < accountsWithRandomValidationScore.length; i++) {
        for(let j = 0; j < accountsWithRandomValidationScore.length; j++) {
          accountsWithRandomValidationScore[i]["validationScore"] = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
        }
      }
    }
  }

  addValidationScore();
  mockValidationScoreForUsers();

  return (
    <>
      {havePosts ? (
        <div>
          {fetchedPosts.map((post, index) => (
            <Post key={index} post={post} ranValidationScore={accountsWithRandomValidationScore} />
          ))}
        </div>
      ) : (
        <div>
          <h3>Be the first to post here for</h3>
          <h3>{selectedCategory["category"]} </h3>
        </div>
      )}
    </>
  );
};

export default Posts;