import { VoucherQuestion, VoucherQuestionTypeEnum } from "@types";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { FormInput } from "@components";

export interface FormQuestionProps {
  onSave?: (values: FormQuestionValues) => Promise<void>;
  questions?: VoucherQuestion[];
}

export interface FormQuestionValues {
  questions: {
    name: string;
    questionId: number;
    type: string;
    choices?: number[];
    answer?: string;
  }[];
}

const validationSchema = Yup.object<FormQuestionValues>().shape({
  questions: Yup.array().of(
    Yup.object().shape({
      questionId: Yup.string().required("Question id required"),
      type: Yup.string().required("Type required"),
      answer: Yup.string().when("type", {
        is: VoucherQuestionTypeEnum.FREE,
        then: (schema) =>
          schema
            .required("Answer required")
            .max(200, "Answer must be at most 200 characters"),
        otherwise: (schema) => schema.nullable(),
      }),
      choices: Yup.array().when("type", {
        is: (v: string) =>
          v === VoucherQuestionTypeEnum.MULTIPLE_CHOICE ||
          v === VoucherQuestionTypeEnum.SINGLE_CHOICE,
        then: (schema) =>
          schema.min(1).of(Yup.number().required("Choice required")),
        otherwise: (schema) => schema.nullable(),
      }),
    })
  ),
});

const resolver = yupResolver(validationSchema);

export function FormQuestions(props: FormQuestionProps) {
  const { questions, onSave } = props;

  const form = useForm<FormQuestionValues>({
    defaultValues: { questions: [] },
    resolver,
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: FormQuestionValues) {
    try {
      onSave && (await onSave(values));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  const {
    append,
    fields,
    update,
    replace: fieldsQuestionReplace,
  } = useFieldArray<FormQuestionValues>({
    control,
    name: "questions",
  });

  React.useEffect(() => {
    if (questions) {
      fieldsQuestionReplace(
        questions.map((q) => {
          return {
            name: q.question,
            questionId: q.id,
            type: q.type,
            choices: [],
            answer: "",
          };
        })
      );
    }
  }, [append, fieldsQuestionReplace, questions]);

  function handleChangeCheckChoice(
    index: number,
    id: number,
    checked: boolean
  ) {
    const currentField = fields[index];
    if (!currentField) return;
    if (!checked) {
      const newChoices = currentField.choices?.filter((c) => c !== id);
      update(index, { ...currentField, choices: newChoices });
    } else {
      update(index, {
        ...currentField,
        choices: [...(currentField.choices || []), id],
      });
    }
  }

  function handleChangeSingleChoice(index: number, v: string) {
    const currentField = fields[index];
    if (!currentField) return;
    const id = parseInt(v);
    update(index, { ...currentField, choices: [id] });
  }

  return (
    <Box>
      <Divider />
      <Box
        mt={2}
        as="h3"
        fontWeight={700}
        fontSize="lg"
        mb={2}
        textAlign="left"
      >
        Please answer the following questions to get the voucher
      </Box>
      <Divider />
      <Box as="form" mt={4} onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          const currentQuestion = questions?.find(
            (q) => q.id === field.questionId
          );

          const currentError = errors.questions?.[index];

          return (
            <Box key={field.id} mt={2}>
              <Box>
                <Box textAlign="left" as="p" fontWeight={700}>
                  Question {fields.length > 1 ? index + 1 : ""}: {field.name}
                </Box>
                {field.type === VoucherQuestionTypeEnum.SINGLE_CHOICE && (
                  <Box mt={2}>
                    <RadioGroup
                      onChange={(v) => {
                        handleChangeSingleChoice(index, v);
                      }}
                      value={field.choices?.[0]?.toString()}
                    >
                      <Stack direction="column">
                        {currentQuestion?.voucherQuestionChoices?.map(
                          (choice) => {
                            return (
                              <Radio
                                key={choice.id}
                                value={choice.id.toString()}
                              >
                                {choice.choice}
                              </Radio>
                            );
                          }
                        )}
                      </Stack>
                    </RadioGroup>
                    {currentError?.choices && (
                      <Box
                        textAlign="left"
                        as="p"
                        color="red.500"
                        fontSize="sm"
                      >
                        Must choose at least 1 choice
                      </Box>
                    )}
                  </Box>
                )}
                {field.type === VoucherQuestionTypeEnum.MULTIPLE_CHOICE && (
                  <Box
                    mt={2}
                    display="flex"
                    flexDir="column"
                    alignItems="flex-start"
                  >
                    {currentQuestion?.voucherQuestionChoices?.map((choice) => {
                      return (
                        <Box key={choice.id}>
                          <Checkbox
                            isChecked={field.choices?.includes(choice.id)}
                            onChange={(e) => {
                              handleChangeCheckChoice(
                                index,
                                choice.id,
                                e.target.checked
                              );
                            }}
                            colorScheme="red"
                          >
                            {choice.choice}
                          </Checkbox>
                        </Box>
                      );
                    })}
                    {currentError?.choices && (
                      <Box as="p" color="red.500" fontSize="sm">
                        Must choose at least 1 choice
                      </Box>
                    )}
                  </Box>
                )}
                {field.type === VoucherQuestionTypeEnum.FREE && (
                  <Box mt={2}>
                    <FormInput
                      isMutliline={true}
                      isRequired={true}
                      disabled={isSubmitting}
                      id={`questions.${index}.answer`}
                      inputProps={{
                        ...register(`questions.${index}.answer`),
                      }}
                      errors={errors}
                      error={currentError?.answer?.message}
                      label="Answer"
                    />
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          variant="primary"
          mt={4}
          minW={200}
        >
          Claim
        </Button>
      </Box>
    </Box>
  );
}
