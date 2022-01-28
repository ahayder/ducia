import { useMoralisQuery } from "react-moralis";
import Categories from "./Categories";
import Feed from "./Feed";
import Account from "./Account";
import AddPost from "./Feed/components/AddPost";
import { SimpleGrid, Flex, Spacer, Text, Box, Heading } from "@chakra-ui/react";

const MainContainer = () => {
  const queryCategories = useMoralisQuery("Categories");
  const fetchedCategories = JSON.parse(
    JSON.stringify(queryCategories.data, ["categoryId", "category"])
  );

  console.log(fetchedCategories);
  return (
    <>
      <SimpleGrid columns={[1, 2, 3]} spacing={0} h={"100vh"} bg={"#222222"}>
        <Flex direction={"column"} width={"33vw"}>
          <Heading color={"gray.300"} ml={"2rem"} mt={".5rem"} mb={"2rem"}>
            Ducia
          </Heading>
          <Categories categories={fetchedCategories} />
        </Flex>
        <Flex
          direction={"column"}
          width={"34vw"}
          borderRight={"1px solid #ebebeb20"}
          borderLeft={"1px solid #ebebeb20"}
        >
          <Text
            borderBottom={"1px solid #ebebeb20"}
            paddingBottom={"0.5rem"}
            paddingLeft={"0.5rem"}
            color={"gray.300"}
            fontSize={"4xl"}
            fontWeight={"bold"}
          >
            Home
          </Text>
          <AddPost />
          <Feed />
        </Flex>
        <Flex direction={"column"} width={"33vw"} alignItems={"flex-end"} paddingTop={"0.5rem"}>
          <Account />
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default MainContainer;
