import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();
  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    // console.log(email,password)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack className="contain" spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel ml="3px">Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          focusBorderColor="#a3c2c2"
          _placeholder={{ color: "inherit" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel ml="3px">Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            focusBorderColor="#a3c2c2"
            _placeholder={{ color: "inherit" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4rem">
            <Button h="1.75rem" size="xs" onClick={handleClick}>
              {show ? (
                <FontAwesomeIcon className="icon" icon={faEye} />
              ) : (
                <FontAwesomeIcon className="icon" icon={faEyeSlash} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        className="btn"
        colorScheme="teal"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        color="#fff"
        variant="solid"
        colorScheme="cyan"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
