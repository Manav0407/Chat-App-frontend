import { Stack, Badge, TextField } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import ConvoHeader from "./Modules/ConvoHeader";
import { ConvoFooter } from "./Modules/ConvoFooter";
import ConvoMain from "./Modules/ConvoMain";
import { MessagesProvider } from "./Modules/ConvoFooter";
import { useGetChatDetailsQuery } from "../Redux/Api/api";
import { useErrors } from "../hooks/hooks";

const Conversation = ({ chatId }) => {
  const theme = useTheme();

  const { data, isError, error, isLoading } = useGetChatDetailsQuery({
    chatId,
    populate: true,
  });

  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  return (
    <MessagesProvider>
      <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
        <ConvoHeader chatId={chatId} chatDetails={data?.chat} />
        <ConvoMain chatId={chatId} />
        <ConvoFooter chatId={chatId} />
      </Stack>
    </MessagesProvider>
  );
};

export default Conversation;
