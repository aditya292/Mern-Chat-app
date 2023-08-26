import "./style.css";
import React, { useEffect } from "react";
import {
  Box,
  Container,
  TabList,
  Text,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container className="container" maxW="xl" centerContent>
      <Box
        className="box"
        d="flex"
        justifyContent="center"
        padding="10px;"
        // bg={"white"}
        bg={"transparent"}
        bgOpacity="55%"
        w="100%"
        m="40px 0 10px 0"
        border="1px solid #f2f2f2"
        borderRadius="lg"
        borderWidth="1px"
        textAlign="center"
      >
        <Text
          className="text"
          fontSize="3xl"
          fontFamily="Work sans"
          color="white"
        >
          ChatHub
        </Text>
      </Box>
      <Box
        className="box"
        // bg="white"
        bg="transparent"
        w="100%"
        p={3}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs className="tabs" variant="soft-rounded" colorScheme="teal">
          <TabList className="tablist" mb="0.7em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
