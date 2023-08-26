import "./style.css";
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
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chat-app");
      data.append("cloud_name", "dzo6bjnsu");
      fetch("https://api.cloudinary.com/v1_1/dzo6bjnsu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          // console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        Duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registation Successful",
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
      <FormControl id="first-name" isRequired>
        <FormLabel ml="3px">Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          focusBorderColor="#a3c2c2"
          _placeholder={{ color: "inherit" }}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel ml="3px">Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          focusBorderColor="#a3c2c2"
          _placeholder={{ color: "inherit" }}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel ml="3px">Password</FormLabel>
        <InputGroup>
          <Input
            // type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            focusBorderColor="#a3c2c2"
            _placeholder={{ color: "inherit" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4rem">
            {/* <Button h="1.75rem" size="xs" onClick={handleClick}>
              {show ? (
                <FontAwesomeIcon className="icon" icon={faEye} />
              ) : (
                <FontAwesomeIcon className="icon" icon={faEyeSlash} />
              )}
            </Button> */}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel ml="3px">Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            focusBorderColor="#a3c2c2"
            _placeholder={{ color: "inherit" }}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4rem">
            <Button h="1.75rem" size="xs" onClick={handleClick}>
              {/* {show ? "Hide" : "Show"} */}
              {show ? (
                <FontAwesomeIcon className="icon" icon={faEye} />
              ) : (
                <FontAwesomeIcon className="icon" icon={faEyeSlash} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          className="upload"
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        className="btn"
        colorScheme="teal"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;
