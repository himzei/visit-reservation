import { Button, HStack, Text } from "@chakra-ui/react";
import { DatePicker, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Page() {
  return (
    <HStack py="20" w="full" justifyContent="center">
      <HStack w="1024px">
        <HStack alignItems="flex-start">
          {/* 1 */}
          <Link to="/security/status">
            <Button>
              <Text fontWeight="600" fontSize="20">
                지킴이페이지 이동
              </Text>
            </Button>
          </Link>
          {/* 2 */}
          <Link to="/teacher/approval">
            <Button>
              <Text fontWeight="600" fontSize="20">
                교사페이지 이동
              </Text>
            </Button>
          </Link>
          {/* 3 */}
          <Link to="/admin/confirm">
            <Button>
              <Text fontWeight="600" fontSize="20">
                어드민페이지 이동
              </Text>
            </Button>
          </Link>
        </HStack>
      </HStack>
    </HStack>
  );
}
