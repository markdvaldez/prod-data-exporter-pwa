import { Preview } from "@storybook/react";
import React from "react";
import "../src/app/globals.css";
import { Wrapper } from "./Wrapper";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#F9FAFB" },
        { name: "dark", value: "#09090B" },
      ],
    },
  },
  decorators: [
    (Story) => {
      return (
        <Wrapper>
          <Story />
        </Wrapper>
      );
    },
  ],
};

export default preview;
