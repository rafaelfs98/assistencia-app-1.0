import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Code, Input } from "@mantine/core";
import { IMaskInput } from "react-imask";

const ClientesForm = () => {
  const [submittedValues, setSubmittedValues] = useState("");

  const form = useForm({
    initialValues: {
      firstName: "Jane",
      lastName: "Doe",
      age: "33",
    },

    transformValues: (values) => ({
      fullName: `${values.firstName} ${values.lastName}`,
      age: Number(values.age) || 0,
    }),
  });

  return (
    <Box maw={400} mx="auto">
      <form
        onSubmit={form.onSubmit((values) =>
          setSubmittedValues(JSON.stringify(values, null, 2))
        )}
      >
        <TextInput required label="Nome" placeholder="Informe Nome" />
        <TextInput
          type={"email"}
          label="Email"
          required
          placeholder="Informe Email"
          mt="md"
        />
        <Input.Wrapper label="Your phone" required maw={320} mt="md">
          <Input<any>
            component={IMaskInput}
            mask="+55 (00) 00000-0000"
            placeholder="Your phone"
          />
        </Input.Wrapper>
        <Button type="submit" mt="md">
          Submit
        </Button>
      </form>

      {submittedValues && <Code block>{submittedValues}</Code>}
    </Box>
  );
};

export default ClientesForm;
