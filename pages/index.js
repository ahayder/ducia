import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import MainContainer from "../components/MainContainer";
import LandingPage from "../components/LandingPage/LandingPage";

export default function Home() {
  const router = useRouter();
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
  }, [isAuthenticated, isWeb3Enabled]);
  return <>{isAuthenticated ? <MainContainer /> : <LandingPage />}</>;
}
