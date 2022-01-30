import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import Account from "./Account";
import {
  Flex,
  Icon,
  chakra,
  Box,
  useColorModeValue,
  Text,
  Image,
} from "@chakra-ui/react";
import Reputation from "./Reputation";
import { GrConnect } from "react-icons/gr";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);
const MotionImage = motion(Image);

const RightSidebar = () => {
  const { selectedCategory } = useMoralisDapp();

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        bg={"gray.900"}
        width={"100%"}
        borderRadius={"xl"}
        p={6}
        direction={"column"}
      >
        <Text
          color={useColorModeValue("gray.300", "gray.300")}
          fontWeight="bold"
          fontSize={["sm", "2xl"]}
        >
          Your Earned Badges
        </Text>
        <Flex p={6} justifyContent={"space-around"}>
            <MotionImage whileHover={{ scale: 1.2 }} px={"3"} width={"5rem"} src="/graphic-assets/silver.png" />
            <MotionImage whileHover={{ scale: 1.2 }} px={"3"} width={"5rem"} src="/graphic-assets/ingots.png" />
            <MotionImage whileHover={{ scale: 1.2 }} px={"3"} width={"5rem"} src="/graphic-assets/gem.png" />
        </Flex>
      </Flex>

      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        borderRadius={"xl"}
        p={6}
        direction={"column"}
        bg={"gray.900"}
        my={6}
      >
        <MotionFlex
          bgGradient={"linear(to-r, purple.500, orange.500)"}
          mb={6}
          borderRadius={"xl"}
          borderBottom={"5px solid #ebebeb50"}
          width={"95%"}
          whileHover={{ scale: 1.2 }}
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            color={"gray.300"}
            fontSize={["sm", "5xl"]}
            padding={".5rem"}
          >
            <Icon color={"gray.300"} as={GrConnect} size={"1rem"} />
          </Flex>

          <Box mx={-3} py={2} px={4}>
            <Box mx={3}>
              <chakra.span
                color={useColorModeValue("gray.900", "gray.900")}
                fontWeight="bold"
                fontSize={["sm", "2xl"]}
              >
                Connected Wallet
              </chakra.span>
              <Account />
            </Box>
          </Box>
        </MotionFlex>

        <MotionFlex
          bgGradient={"linear(to-r, cyan.500, purple.500)"}
          borderRadius={"xl"}
          borderBottom={"5px solid #ebebeb50"}
          width={"95%"}
          whileHover={{ scale: 1.2 }}
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            w={"4.5rem"}
            color={"gray.900"}
            fontSize={["sm", "5xl"]}
          >
            <Reputation />
          </Flex>

          <Box mx={-3} py={2} px={4}>
            <Box mx={3}>
              <chakra.span
                color={useColorModeValue("gray.900", "gray.900")}
                fontWeight="bold"
                fontSize={["sm", "2xl"]}
              >
                Reputation
              </chakra.span>
              <chakra.p
                color={useColorModeValue("gray.300", "gray.300")}
                fontSize="lg"
              >
                in {selectedCategory["category"]} Topic
              </chakra.p>
            </Box>
          </Box>
        </MotionFlex>
      </Flex>
    </>
  );
};

export default RightSidebar;
