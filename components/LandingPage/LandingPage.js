import Account from "../Account";
import { Flex, Spacer, Text, Box, Image } from "@chakra-ui/react";
import ParticleBg from "./Particles";
import "@fontsource/be-vietnam-pro"

const LandingPage = () => {
  return (
    <>
      <Flex direction={"column"}>
        <Flex
          w={"100vw"}
          bgGradient="linear(to-r, cyan.500, purple.500)"
          height={"100vh"}
          px={"10rem"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image
            width={"7rem"}
            src={"logo/ducia.png"}
            position={"absolute"}
            left={"1rem"}
            top={"1rem"}
          />

          <Box>
            <Text
              fontFamily={"Be Vietnam Pro"}
              fontSize={"5rem"}
              textTransform={["uppercase"]}
              letterSpacing={["-0.4rem"]}
              color={"#e1e3e5"}
              textShadow={"-15px 5px 20px #1A1D7F"}
            >
              Incentivising
            </Text>
            <Text
              fontFamily={"Be Vietnam Pro"}
              fontSize={"5rem"}
              textTransform={["uppercase"]}
              letterSpacing={["-0.4rem"]}
              color={"#e1e3e5"}
              textShadow={"-15px 5px 20px #1A1D7F"}
            >
              Truthful
            </Text>{" "}
            <Text
              fontFamily={"Be Vietnam Pro"}
              fontSize={"5rem"}
              textTransform={["uppercase"]}
              letterSpacing={["-0.4rem"]}
              color={"#e1e3e5"}
              textShadow={"-15px 5px 20px #1A1D7F"}
            >
              Information
            </Text>
            <Text
              fontFamily={"Be Vietnam Pro"}
              fontSize={"5rem"}
              textTransform={["uppercase"]}
              letterSpacing={["-0.4rem"]}
              color={"#e1e3e5"}
              textShadow={"-15px 5px 20px #1A1D7F"}
            >
              Exchange
            </Text>
          </Box>

          <Spacer />
          <Account />
        </Flex>
        <ParticleBg />
      </Flex>
    </>
  );
};

export default LandingPage;
