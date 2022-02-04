import { useMoralisDapp } from "../../../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis";
import { useEffect, useState, createElement } from "react";
import { Tooltip, Avatar, message } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import Blockie from "../../Blockie";
import Votes from "./Votes";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Flex,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";

const Post = ({ post }) => {
  const { contentId, postId, postOwner } = post;
  const { selectedCategory } = useMoralisDapp();
  console.log(selectedCategory);
  const [postContent, setPosContent] = useState({
    title: "default",
    content: "default",
  });
  const { data } = useMoralisQuery("Contents", (query) =>
    query.equalTo("contentId", contentId)
  );
  const [voteStatus, setVoteStatus] = useState();
  const { data: votes } = useMoralisQuery(
    "Votes",
    (query) => query.equalTo("postId", postId),
    [],
    {
      live: true,
    }
  );

  const { walletAddress, contractABI, contractAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const contractProcessor = useWeb3ExecuteFunction();

  useEffect(() => {
    function extractUri(data) {
      const fetchedContent = JSON.parse(JSON.stringify(data, ["contentUri"]));
      const contentUri = fetchedContent[0]["contentUri"];
      return contentUri;
    }
    async function fetchIPFSDoc(ipfsHash) {
      console.log(ipfsHash);
      const url = ipfsHash;
      const response = await fetch(url);
      return await response.json();
    }
    async function processContent() {
      const content = await fetchIPFSDoc(extractUri(data));
      setPosContent(content);
    }
    if (data.length > 0) {
      processContent();
    }
  }, [data]);

  useEffect(() => {
    if (!votes?.length) return null;

    async function getPostVoteStatus() {
      const fetchedVotes = JSON.parse(JSON.stringify(votes));
      fetchedVotes.forEach(({ voter, up }) => {
        if (voter === walletAddress) setVoteStatus(up ? "liked" : "disliked");
      });
      return;
    }

    getPostVoteStatus();
  }, [votes, walletAddress]);

  async function vote(direction) {
    if (walletAddress.toLowerCase() === postOwner.toLowerCase())
      return message.error("You cannot vote on your posts");
    if (voteStatus) return message.error("Already voted");
    const options = {
      contractAddress: contractAddress,
      functionName: direction,
      abi: contractABIJson,
      params: {
        _postId: post["postId"],
        [direction === "voteDown" ? "_reputationTaken" : "_reputationAdded"]: 1,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => console.log("success"),
      onError: (error) => console.error(error),
    });
  }

  const loading = (
    <Stack>
      <Skeleton
        colorScheme={"gray"}
        speed="5"
        my={6}
        borderRadius={"xl"}
        height="10rem"
      />
    </Stack>
  );

  const result = (
    <>
      <Center my={5} p={6} bg={"gray.900"} borderRadius={"xl"}>
        <Box
          w={"full"}
          bg="gray.900"
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Stack>
            <Text
              color={"cyan.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              {selectedCategory.category}
            </Text>
            <Heading
              color="gray.100"
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {postContent["title"]}
            </Heading>
            <Text color={"gray.200"}>{postContent["content"]}</Text>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={<Blockie address={post["postOwner"]} scale="4" />}
            ></Avatar>
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600} color={"gray400"}>
                Author: Anonymous
              </Text>
              <Text color={"gray.500"}>{post["postOwner"]}</Text>
            </Stack>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Tooltip key="comment-basic-like" title="Vote Up">
              <Flex
                fontSize="15px"
                alignItems="center"
                justifyContent="center"
                marginRight="16px"
                color="gray.300"
                onClick={() => vote("voteUp")}
              >
                {createElement(
                  voteStatus === "liked" ? LikeFilled : LikeOutlined
                )}{" "}
                Vote Up
              </Flex>
            </Tooltip>
            ,
            <span key="comment-basic-votes" style={{ fontSize: "15px" }}>
              <Votes postId={postId} />
            </span>
            ,
            <Tooltip key="comment-basic-dislike" title="Dislike">
              <Flex
                fontSize="15px"
                alignItems="center"
                justifyContent="center"
                marginLeft="8px"
                color="gray.300"
                onClick={() => vote("voteDown")}
              >
                {createElement(
                  voteStatus === "disliked" ? DislikeFilled : DislikeOutlined
                )}
                Vote Down
              </Flex>
            </Tooltip>
          </Stack>
        </Box>
      </Center>
    </>
  );

  return postContent["title"] === "default" ? loading : result;
};

export default Post;
