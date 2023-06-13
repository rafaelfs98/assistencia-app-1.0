import { Header } from "@mantine/core";

const HeaderApp: React.FC = () => {
  return (
    <Header
      className="header"
      height={{ base: 50, md: 70 }}
      p="md"
      children={undefined}
      withBorder={false}
    />
  );
};
export default HeaderApp;
