import { Box, Container, Loader, LoadingOverlay } from "@mantine/core";
import { useState } from "react";

const Loading = () => {
  return (
    <Container
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Loader />
    </Container>
  );
};

export default Loading;
