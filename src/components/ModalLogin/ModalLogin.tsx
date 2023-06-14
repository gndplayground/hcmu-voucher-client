import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  IconButton,
  Box,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiXCircle } from "react-icons/fi";
import { FormInput } from "@components";
import { useForm } from "react-hook-form";
import { useAuthLogin } from "@hooks";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
export interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FormLoginValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object<FormLoginValues>().shape({
  email: Yup.string().required("Email required").email("Invalid email"),
  password: Yup.string().required("Password required").min(6),
});

const resolver = yupResolver(validationSchema);

export function ModalLogin(props: ModalLoginProps) {
  const { isOpen, onClose } = props;
  const authLogin = useAuthLogin();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginValues>({
    resolver,
  });

  function onSubmit(values: FormLoginValues) {
    authLogin.mutate({
      email: values.email,
      password: values.password,
    });
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <IconButton
          aria-label={""}
          variant="outline"
          pos="absolute"
          top="16px"
          right="16px"
          onClick={onClose}
        >
          <FiXCircle />
        </IconButton>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading textAlign="center" fontSize={"4xl"}>
              Sign in to your account
            </Heading>
          </Stack>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")}>
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
                  variant="primary"
                >
                  Sign in
                </Button>
              </Stack>
              <Box textAlign="center" mt={2}>
                <Button
                  variant="link"
                  onClick={onClose}
                  as={Link}
                  to="/register"
                >
                  Register
                </Button>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </ModalContent>
    </Modal>
  );
}
