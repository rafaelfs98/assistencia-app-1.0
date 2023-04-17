import { Container, Loader } from "@mantine/core";

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
