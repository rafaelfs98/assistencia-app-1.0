import { Container, Image } from "@mantine/core";

const Home = () => {
  return (
    <>
      <Container mt="xs" size="xs" px="xs">
        <Image
          maw={240}
          mx="auto"
          radius="md"
          src="./SuiteOSBack.png"
          alt="Random image"
        />
      </Container>
    </>
  );
};
export default Home;
