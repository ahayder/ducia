import {useMoralisDapp} from "../../providers/MoralisDappProvider/MoralisDappProvider"
import {useState} from "react"
import Posts from "./components/Posts"
import Reputation from "../Reputation"

import {Avatar, Button }from "antd" 
import glStyles from "../gstyles"
import Blockie from "../Blockie"

const Feed = () => {
    const {selectedCategory} = useMoralisDapp();
    const [showAddPost, setShowAddPost] = useState(false)

    let result = null;

    if (selectedCategory["category"] === "default") {
        result = (
          <div className="col-lg-9">
            <h3>Choose a Category</h3>
          </div>
        );
      }
    else {
        result = (
        <div className="col-lg-9">
            <div
                style={{
                    ...glStyles.card,
                    padding: "10px 13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Avatar src={<Blockie currentWallet />} />
                <h4> Your Reputation in {selectedCategory["category"]} is <Reputation/> </h4>
                <Button shape="round">
                    Post
                </Button>
            </div>
            <Posts/>
        </div>    
        )
    }
    
    return result;
}

export default Feed
