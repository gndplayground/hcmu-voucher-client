import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { IsEmail, IsNotEmpty } from "class-validator";
import { getClassValidatorResolver } from "@utils/form";
import { FormInput } from "@components";
import { useAuthLogin } from "@hooks";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@stores/auth";
import React from "react";

class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

const resolver = getClassValidatorResolver(LoginDto);

export function Login() {
  const authLogin = useAuthLogin();
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

  function onSubmit(values: Record<string, any>) {
    authLogin.mutate({
      email: values.email,
      password: values.password,
    });
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
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
            <Box textAlign="center" mt={2}>
              <Button variant="link" as={Link} to="/register">
                Register
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
