import { useMoralisQuery } from "react-moralis";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import Categories from "./Categories";
import Feed from "./Feed";
import Account from "./Account";
import AddPost from "./Feed/components/AddPost";
import {
  SimpleGrid,
  Flex,
  Text,
  Heading,
  Icon,
  chakra,
  Box,
  useColorModeValue,
  Image,
  Button,
} from "@chakra-ui/react";
import Reputation from "./Reputation";
import { GrConnect } from "react-icons/gr";
import RightSidebar from "./RightSidebar";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

const MainContainer = () => {
  const { selectedCategory } = useMoralisDapp();
  const [showAddPost, setShowAddPost] = useState(false);
  const queryCategories = useMoralisQuery("Categories");
  const fetchedCategories = JSON.parse(
    JSON.stringify(queryCategories.data, ["categoryId", "category"])
  );

  console.log(fetchedCategories);
  return (
    <>
      <Flex h={"100vh"} width={"100vw"} bg={"black"}>
        <Flex direction={"column"} width={"25%"} pr={"1rem"}>
          <Image
            src="/logo/ducia.png"
            width={"4rem"}
            mt={"1rem"}
            ml={"10rem"}
            mb={"22vh"}
          />
          <Categories categories={fetchedCategories} />
        </Flex>
        <Flex
          direction={"column"}
          width={"45%"}
          borderRight={"1px solid #ebebeb20"}
          borderLeft={"1px solid #ebebeb20"}
          overflow={"auto"}
          px={"6"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#7F5AD5",
              borderRadius: "24px",
            },
          }}
        >
          <Flex
            paddingBottom={"0.5rem"}
            borderBottom={"1px solid #ebebeb20"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text
              paddingLeft={"0.5rem"}
              color={"gray.300"}
              fontSize={"4xl"}
              fontWeight={"bold"}
            >
              Home
            </Text>
            <Button
              bgGradient={"linear(to-r, purple.500, pink.500)"}
              color={"white"}
              fontSize={"xl"}
              onClick={() => {
                setShowAddPost(true);
              }}
              _hover={{ bg: "pink.500" }}
            >
              <AddIcon />
            </Button>
          </Flex>
          <AddPost />
          <Feed />
        </Flex>

        <Flex
          direction={"column"}
          width={"30%"}
          alignItems={"flex-start"}
          paddingTop={"0.5rem"}
          p={"6"}
        >
          <RightSidebar />
        </Flex>
      </Flex>
    </>
  );
};

export default MainContainer;
