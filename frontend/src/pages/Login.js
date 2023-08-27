import { Box, Flex, Image, Text } from "@chakra-ui/react";
import CustomButton from "../components/CustomButton/customButton";
import TextInput from "../components/TextInputs/TextInput";
import brandLogo from "../assets/icons/brand-logo-dark.svg";
import PasswordInput from "../components/TextInputs/PasswordInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { useNavigate } from "react-router-dom";
import { Spinner } from "evergreen-ui";
import Cookies from "js-cookie";
import UnstoppableLogo from "../assets/icons/unstoppable-logo.png";
import GmailLogo from "../assets/icons/gmail-icon.png";
import EmailLogo from "../assets/icons/email-icon.png";
import { uauth } from "../utils/methods";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [continueWithEmail, setContinueWithEmail] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const { address } = useAccount();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    logInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) {
      <Spinner />;
    }
    Cookies.set("userId", user?.uid)
    if (user) navigate("/home");
  }, [user, loading]);

  const loginWithUnstoppable = async () => {
    try {
      const authorization = await uauth.loginWithPopup();
      const walletAddress = authorization.idToken.wallet_address;
      signInWithGoogle();
      localStorage.setItem('wallet_addr', walletAddress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (address) {
      localStorage.setItem('wallet_addr', address);
      signInWithGoogle();
    }
  }, [address]);

  return (
    <Flex w="100%">
      <Box w="55%" className="main-bg" h="100vh">
        <Text color="brand.lightGrey" fontWeight="900" fontSize="40px">
          Welcome Back!
        </Text>
        <Text color="brand.yellow" fontSize="14px">
          Continue your journey to improve the ecosystem
        </Text>
      </Box>
      <Box w="45%" p="80px">
        <a href="/">
          <Image src={brandLogo} alt="brand-logo" margin="0 auto" />
        </a>
        <Box mt="70px">
          {/* <Flex bg="brand.primary" color="white" fontWeight="600" p="10px" alignItems="center" justifyContent="center" borderRadius="8px" cursor="pointer" _hover={{ bg: "brand.green" }} mt="20px" fontSize="14px" onClick={() => setContinueWithEmail(!continueWithEmail)}>
            <Image src={EmailLogo} alt="email" w="25px" />
            <Text ml="10px">Continue with Email</Text>
          </Flex> */}
          <Flex bg="none" color="black" fontWeight="600" p="10px" alignItems="center" justifyContent="center" borderRadius="8px" cursor="pointer" _hover={{ bg: "brand.lightGrey" }} mt="30px" boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" fontSize="14px" onClick={loginWithUnstoppable}>
            <Flex ml="12px" borderRadius="50%" w="30px" h="30px" boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" alignItems="center" justifyContent="center">
              <Image cursor="pointer" src={UnstoppableLogo} alit="unstoppable-logo" w="20px" />
            </Flex>
            <Text ml="10px">Login With Unstoppable</Text>
          </Flex>
          <Flex bg="none" color="black" fontWeight="600" p="10px" alignItems="center" justifyContent="center" borderRadius="8px" cursor="pointer" _hover={{ bg: "brand.lightGrey" }} mt="30px" boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" fontSize="14px" onClick={signInWithGoogle}>
            <Flex ml="12px" borderRadius="50%" w="30px" h="30px" boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" alignItems="center" justifyContent="center">
              <Image cursor="pointer" src={GmailLogo} alit="unstoppable-logo" w="20px" />
            </Flex>
            <Text ml="10px">Login with Google</Text>
          </Flex>

          <Flex bg="#0D76FD" color="black" fontWeight="600" p="10px" alignItems="center" justifyContent="center" borderRadius="8px" cursor="pointer" mt="30px" boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" fontSize="14px">
            <Flex ml="12px" borderRadius="50%" w="100%" h="30px" boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" alignItems="center" justifyContent="center">
              <ConnectButton label="Login with ENS" />
              {/* <Image cursor="pointer" src="https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F464911102-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fcollections%252F2TjMAeHSzwlQgcOdL48E%252Ficon%252FKWP0gk2C6bdRPliWIA6o%252Fens%2520transparent%2520background.png%3Falt%3Dmedia%26token%3Dbd28b063-5a75-4971-890c-97becea09076" alit="unstoppable-logo" w="20px" /> */}
            </Flex>
            {/* <Text ml="10px" color="white">Login with ENS</Text> */}
          </Flex>

          {continueWithEmail && 
            <form onSubmit={handleSubmit}>
              <Text mt="30px" color="brand.dark" fontWeight="extrabold" fontSize="20px" textAlign="center">Login</Text>
              <TextInput
                type="email"
                placeholder="Enter your email"
                label="Email"
                color="brand.dark"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                type="password"
                placeholder="Enter your password"
                label="Password"
                color="brand.dark"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <CustomButton
                m="30px 0"
                w="100%"
                p="25px"
                bg="brand.lightGreen"
                color="brand.white"
                hoverBg="brand.green"
                disabled={!email || !password}
              >
                {loading ? <Spinner /> : 'Log In'}
              </CustomButton>
            </form>
          }
          <Flex fontSize="14px" mt="25px" justifyContent="center">
            <Text>Don't have an account yet?</Text>
            <a href="/signup">
              <Text
                ml="10px"
                color="brand.orange"
                _hover={{ color: "brand.yellow" }}
                cursor="pointer"
                fontWeight="bold"
              >
                Sign Up
              </Text>
            </a>
          </Flex>
          <a href="/forgot-password">
            <Text color="brand.green" textAlign="center" mt="20px" cursor="pointer" _hover={{ color: "brand.orange" }}>Forgot Password ?</Text>
          </a>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
