import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import glStyles from "./gstyles";
import { SimpleGrid, Flex, Spacer, Text, Box, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const Categories = ({ categories }) => {
  const { setSelectedCategory } = useMoralisDapp();

  function selectCategory(categoryId) {
    const selectedCategory = categories.filter(
      (category) => category["categoryId"] === categoryId
    );
    setSelectedCategory(selectedCategory[0]);
  }

  return (
    <Flex direction={"column"} alignItems={"flex-end"}>
      <Text
        color={"gray.400"}
        fontSize={"4xl"}
        width={"11rem"}
      >
        Topics
      </Text>
      <Box>
        <Flex direction={"column"} key="categories" alignItems={"flex-start"}>
          {categories.map((category) => (
            <Button
              my={".4rem"}
              variant={"link"}
              color={"gray.400"}
              fontSize={"xl"}
              key={category["categoryId"]}
              leftIcon={<StarIcon />}
              letterSpacing={"0.1rem"}
              onClick={() => selectCategory(category["categoryId"])}
            >
              {category["category"]}
            </Button>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Categories;
