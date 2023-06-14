import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { FormInput } from "@components";
import { useRegister } from "@hooks";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@stores/auth";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiArrowLeft } from "react-icons/fi";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const resolver = yupResolver(schema);

export function Register() {
  const authRegister = useRegister();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  React.useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver,
  });

  async function onSubmit(values: Record<string, any>) {
    try {
      authRegister.mutate({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Register</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Button variant="link" as={Link} to="/" leftIcon={<FiArrowLeft />}>
            Back home
          </Button>
          <Stack mt={4} as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              disabled={isSubmitting}
              id="email"
              inputProps={{
                ...register("email"),
              }}
              errors={errors}
              label="Email address"
            />
            <FormInput
              disabled={isSubmitting}
              id="password"
              inputProps={{
                type: "password",
                ...register("password"),
              }}
              errors={errors}
              label="Password"
            />
            <Stack spacing={10}>
              <Button
                disabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
                colorScheme="brand"
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
