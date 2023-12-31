import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ExpertHome from "../pages/ExpertHome";
import PlantNow from "../pages/PlantNow";
import InvitePending from "../pages/InvitePending";
import UploadVideo from "../pages/UploadVideo";
import SuccessUpload from "../pages/SuccessfulUpload";
import AllExperts from "../pages/AllExperts";
import ForgotPassword from "../pages/ForgotPassword";
import ViewPlants from "../pages/ViewPlants";
import '@rainbow-me/rainbowkit/styles.css';

import { publicProvider } from 'wagmi/providers/public';
import { WagmiConfig, configureChains, createConfig, } from 'wagmi';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  optimism,
  goerli,
  arbitrum, arbitrumGoerli, arbitrumNova,
  bscTestnet,
} from 'wagmi/chains';

const { chains, publicClient } = configureChains(
  [mainnet, optimism, goerli, bscTestnet, arbitrum, arbitrumGoerli, arbitrumNova],
  [publicProvider()]
);


const { connectors } = getDefaultWallets({
  appName: 'Willow',
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors
})


const AppRoute = () => {

  return render(
    <BrowserRouter>
     <ChakraProvider theme={theme} resetCSS>
     <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Routes>
            <Route index path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/expert-home" element={<ExpertHome />} />
            <Route path="/plant-now/:id" element={<PlantNow />} />
            <Route path="/invite-pending" element={<InvitePending />} />
            <Route path="/upload-video" element={<UploadVideo />} />
            <Route path="/success" element={<SuccessUpload />} />
            <Route path="/experts" element={<AllExperts />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/view-plants/:id" element={<ViewPlants />} />
          </Routes>
        </RainbowKitProvider>
     </WagmiConfig>
     </ChakraProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

export default AppRoute;
