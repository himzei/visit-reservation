import { Button } from "@chakra-ui/react";
import React from "react";

export default function ButtonSearch({ text, color }) {
  return (
    <div>
      <Button
        height="35px"
        color="white"
        bg="#0066FF"
        _hover={{ bg: "#0053CF" }}
        mx="2"
      >
        {text}
      </Button>
    </div>
  );
}
