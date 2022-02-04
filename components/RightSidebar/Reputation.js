import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { motion } from "framer-motion";
import { duciaConfig } from "../../ducia-config";
import {
    Flex,
    chakra,
    Box,
    useColorModeValue,
  } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";


const MotionFlex = motion(Flex);

const Reputation = () => {
    const { user } = useMoralis();
    const [reputation, setReputation] = useState("null");
    const { selectedCategory } = useMoralisDapp();
  
    useEffect(() => {
      duciaConfig.forEach((config) => {
        if (
          String(config.account).toLowerCase() ==
          String(user.get("ethAddress")).toLowerCase()
        ) {
          setReputation(config.reputation);
        }
      });
    }, []);

  return (
    <MotionFlex
    bgGradient={"linear(to-r, purple.500, red.500)"}
    borderRadius={"xl"}
    borderBottom={"5px solid #ebebeb50"}
    width={"95%"}
  >
    <Flex
      justifyContent="center"
      alignItems="center"
      w={"4.5rem"}
      color={"gray.900"}
      fontSize={["sm", "5xl"]}
    >
      {reputation && `${reputation}`}
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
  );
};

export default Reputation;
