import { useState } from "react";

import { TextInput, Button, Box, Code, Input } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type ClientesFormData = {
  email: string;
  endereco: string;
  nome: string;
  telefone: string;
};

const ClientesForm = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<ClientesFormData>();

  const onSubmit = handleSubmit((clientes) => {
    const clienteString = localStorage.getItem("clientes");
    localStorage.setItem("clientes", clienteString + JSON.stringify(clientes));

    navigate(-1);
  });

  return (
    <Box maw={400} mx="auto">
      <form onSubmit={onSubmit}>
        <TextInput
          label="Nome"
          placeholder="Informe Nome"
          {...register("nome")}
        />
        <TextInput
          type={"email"}
          label="Email"
          placeholder="Informe Email"
          mt="md"
          {...register("email")}
        />
        <TextInput
          type={"text"}
          label="Endereço"
          placeholder="Informe Email"
          mt="md"
          {...register("endereco")}
        />
        <TextInput
          type={"text"}
          label="telefone"
          placeholder="Informe Email"
          mt="md"
          {...register("telefone")}
        />

        <Button type="submit" mt="md">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ClientesForm;
