import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import Account from "../Account";
import {
  Flex,
  Icon,
  chakra,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import BadgeHolder from "./BadgeHolder";
import { GrConnect } from "react-icons/gr";
import { motion } from "framer-motion";
import Reputation from "./Reputation";

const MotionFlex = motion(Flex);

const RightSidebar = () => {
  const { selectedCategory } = useMoralisDapp();

  return (
    <>
      <BadgeHolder />
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
          bgGradient={"linear(to-r, purple.500, red.500)"}
          mb={6}
          borderRadius={"xl"}
          borderBottom={"5px solid #ebebeb50"}
          width={"95%"}
          whileHover={{ scale: 1.2 }}
          cursor={"pointer"}
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
        <Reputation />
      </Flex>
    </>
  );
};

export default RightSidebar;
