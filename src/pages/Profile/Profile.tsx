import { Box, Button, IconButton, Stack } from "@chakra-ui/react";
import { FormInput } from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthChangePassword } from "@hooks";
import React from "react";

import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as yup from "yup";

type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const schema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm new password is required"),
});

const resolver = yupResolver(schema);

export function Profile() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver,
  });

  const changePass = useAuthChangePassword();

  async function onSubmit(values: ChangePasswordFormData) {
    try {
      changePass.mutateAsync({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  return (
    <Box>
      <IconButton as={Link} to="/" aria-label="Back" variant="outline">
        <FiArrowLeft />
      </IconButton>
      <Box
        as="h1"
        fontWeight={700}
        fontSize="1.8rem"
        lineHeight="130%"
        textAlign="center"
        color="brand.500"
      >
        Change Password
      </Box>
      <Box as="p" mt={4} fontSize="sm">
        Please note that you will be required to log in again after changing
        your password.
      </Box>
      <Stack mt={4} as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          disabled={isSubmitting}
          id="currentPassword"
          inputProps={{
            type: "password",
            ...register("currentPassword"),
          }}
          errors={errors}
          label="Current password"
        />
        <FormInput
          disabled={isSubmitting}
          id="newPassword"
          inputProps={{
            type: "password",
            ...register("newPassword"),
          }}
          errors={errors}
          label="New password"
        />
        <FormInput
          disabled={isSubmitting}
          id="confirmNewPassword"
          inputProps={{
            type: "password",
            ...register("confirmNewPassword"),
          }}
          errors={errors}
          label="Confirm new password"
        />
        <Stack spacing={10}>
          <Button
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
            variant="primary"
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
