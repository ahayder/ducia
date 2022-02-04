import { Flex, useColorModeValue, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { duciaConfig } from "../../ducia-config";

const MotionImage = motion(Image);

const BadgeHolder = () => {
  const { user } = useMoralis();
  const [badge, setBadge] = useState("null");

  useEffect(() => {
    duciaConfig.forEach((config) => {
      if (
        String(config.account).toLowerCase() ==
        String(user.get("ethAddress")).toLowerCase()
      ) {
        setBadge(config.badge);
      }
    });
  }, []);

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
        <Text color={"white"}>{badge && `${badge} Badge`}</Text>
        <Flex
          mt={"1rem"}
          border={"1px solid purple"}
          borderRadius={"xl"}
          p={5}
          justifyContent={"space-around"}
        >
          <MotionImage
            whileHover={{ scale: 1.2 }}
            px={"3"}
            width={"5rem"}
            src={
              (badge && badge === "silver") ||
              badge === "gold" ||
              badge === "diamond"
                ? "/graphic-assets/silver.png"
                : "/graphic-assets/lock.png"
            }
            opacity={
              (badge && badge === "silver") ||
              badge === "gold" ||
              badge === "diamond"
                ? 1
                : 0.5
            }
          />
          <MotionImage
            whileHover={{ scale: 1.2 }}
            px={"3"}
            width={"5rem"}
            src={
              (badge && badge === "gold") || badge === "diamond"
                ? "/graphic-assets/ingots.png"
                : "/graphic-assets/lock.png"
            }
            opacity={
              (badge && badge === "gold") || badge === "diamond" ? 1 : 0.5
            }
          />
          <MotionImage
            whileHover={{ scale: 1.2 }}
            px={"3"}
            width={"5rem"}
            src={
              badge && badge === "diamond"
                ? "/graphic-assets/gem.png"
                : "/graphic-assets/lock.png"
            }
            opacity={badge && badge === "diamond" ? 1 : 0.5}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default BadgeHolder;
