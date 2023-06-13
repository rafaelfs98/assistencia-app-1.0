/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type FormOptions = {
  onChange: (state: any) => (event: React.FormEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onError: (error?: any) => void;
  onSave: (param?: any) => void;
  onSubmit: (param?: any) => void;
  onSuccess: () => void;
  submitting: boolean;
};

export type Form = {
  forceRefetch: number;
  form: FormOptions;
};

export type FormComponent = Omit<Form, "forceRefetch">;

const onError = () => {
  let errorMessage = "an-unexpected-error-occurred";

  console.error(errorMessage);
  notifications.show({
    title: "Error!",
    message: "Que pena algo deu errado",
    color: "red",
  });
};

const onSuccess = () => {
  notifications.show({
    title: "Sucesso!",
    message: "Ei deu tudo certo pode continuar",
    color: "green",
  });
};

const useFormActions = (): Form => {
  const [forceRefetch, setForceRefetch] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  const onSave = () => {
    onSuccess();

    setForceRefetch(new Date().getTime());

    navigate(-1);
  };

  const onSubmit = () => {
    onSuccess();

    setForceRefetch(new Date().getTime());
  };

  return {
    forceRefetch,

    form: {
      onChange:
        ({ form, setForm }: any) =>
        (event: any) => {
          const {
            target: { checked, name, type },
          } = event;

          let { value } = event.target;

          if (type === "checkbox") {
            value = checked;
          }

          setForm({
            ...form,
            [name]: value,
          });
        },
      onClose,
      onError,
      onSave,
      onSubmit,
      onSuccess,
      submitting,
    },
  };
};

export default useFormActions;
