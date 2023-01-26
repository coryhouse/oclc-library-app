import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./Navbar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Reusable/Navbar",
  component: Navbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Navbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Navbar> = (args) => (
  <BrowserRouter>
    <Navbar {...args} />
  </BrowserRouter>
);

export const Primary = Template.bind({});
Primary.args = {
  links: [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "About",
      path: "/about",
    },
  ],
};
