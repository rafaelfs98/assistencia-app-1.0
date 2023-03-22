import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";

const UserAvatar: React.FC = () => {
  return (
    <UnstyledButton style={{ display: "block" }}>
      <Group>
        <Avatar size={40} color="blue">
          RF
        </Avatar>
        <div>
          <Text>Rafael Ferreira</Text>
          <Text size="xs" color="dimmed">
            rafaelferreira@handsome.inc
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
};

export default UserAvatar;
