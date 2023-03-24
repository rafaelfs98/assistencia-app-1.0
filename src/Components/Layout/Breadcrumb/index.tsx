import { Breadcrumbs, Anchor } from "@mantine/core";

const items = [
  { title: "Mantine", href: "#" },
  { title: "Mantine hooks", href: "#" },
  { title: "use-id", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const Breadcrumb = () => {
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
    </>
  );
};

export default Breadcrumb;
