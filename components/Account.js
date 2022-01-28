import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
import Blockie from "./Blockie";
import { Card, Modal } from "antd";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import Address from "./Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../helpers/networks";
import { motion } from "framer-motion";
import { Flex, Spacer, Text, Box } from "@chakra-ui/react";
import { Avatar } from "antd";

const MotionButton = motion(Button);

function Account() {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!isAuthenticated) {
    return (
      <MotionButton
        onClick={() => authenticate({ signingMessage: "Hello World!" })}
        zIndex={1}
        bg={"purple.800"}
        color={"white"}
        size={"lg"}
        mt={"2.8rem"}
        variant="solid"
        whileHover={{ scale: 1.2, backgroundColor: "#111355" }}
        boxShadow={"-15px 5px 20px #1A1D7F"}
      >
        Sign In Using MetaMask
      </MotionButton>
    );
  }

  return (
    <>
      <Flex onClick={() => setIsModalVisible(true)} alignItems={"center"}>
        <Text mr={"5px"} color={"purple.400"} fontSize={"lg"} fontWeight={"bold"}>
          {getEllipsisTxt(walletAddress, 6)}
        </Text>
        <Avatar src={<Blockie currentWallet scale={5} />}></Avatar>
      </Flex>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}/address/${walletAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => {
            logout();
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
