import {
  Group,
  Header,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

const HeaderApp: React.FC<any> = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Header
      className="header"
      height={{ base: 50, md: 70 }}
      p="md"
      withBorder={false}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[2],
      })}
    >
      {""}
    </Header>
  );
};
export default HeaderApp;
