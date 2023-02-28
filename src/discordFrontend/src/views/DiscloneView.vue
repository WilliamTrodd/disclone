<script setup lang="ts">
import { ref } from "vue";
import ServerList from "../components/ServerList.vue";
import ChannelList from "../components/ChannelList.vue";
import MessageList from "../components/MessageList.vue";
import MessageInput from "../components/MessageInput.vue";
const servers = ref([
  {
    _id: "63f87660663ff1ba522c6f6f",
    name: "Test Server",
    icon: "src/assets/logo.svg",
    users: [{ id: "63f84cf878b9a5c96f8bf92d" }],
    channels: [
      {
        name: "main",
        messages: [
          {
            text: "Message text",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
          {
            text: "Message text",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
          {
            text: "add message",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322122216",
            _id: "63f9e78a147dc574822bec61",
          },
          {
            text: "Test 3",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322222758",
            _id: "63f9e7ee147dc574822bec62",
          },
          {
            text: "Message text",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
          {
            text: "add message",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322122216",
            _id: "63f9e78a147dc574822bec61",
          },
          {
            text: "Test 3",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322222758",
            _id: "63f9e7ee147dc574822bec62",
          },
          {
            text: "Message text",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
          {
            text: "add message",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322122216",
            _id: "63f9e78a147dc574822bec61",
          },
          {
            text: "Test 3",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322222758",
            _id: "63f9e7ee147dc574822bec62",
          },
          {
            text: "add message",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322122216",
            _id: "63f9e78a147dc574822bec61",
          },
          {
            text: "Test 3",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322222758",
            _id: "63f9e7ee147dc574822bec62",
          },
          {
            text: "Message text",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
          {
            text: "add message",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322122216",
            _id: "63f9e78a147dc574822bec61",
          },
          {
            text: "Test 3",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322222758",
            _id: "63f9e7ee147dc574822bec62",
          },
          {
            text: "Message text",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
          {
            text: "add message",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322122216",
            _id: "63f9e78a147dc574822bec61",
          },
          {
            text: "Test 3",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322222758",
            _id: "63f9e7ee147dc574822bec62",
          },
          {
            text: "Message text",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
          {
            text: "add message",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322122216",
            _id: "63f9e78a147dc574822bec61",
          },
          {
            text: "Test 3",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322222758",
            _id: "63f9e7ee147dc574822bec62",
          },
          {
            text: "Message text",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
          {
            text: "add message",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322122216",
            _id: "63f9e78a147dc574822bec61",
          },
          {
            text: "Test 3",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322222758",
            _id: "63f9e7ee147dc574822bec62",
          },
          {
            text: "Message text",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
          {
            text: "add message",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322122216",
            _id: "63f9e78a147dc574822bec61",
          },
          {
            text: "Test 3",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322222758",
            _id: "63f9e7ee147dc574822bec62",
          },
        ],
        _id: "63f8a0e5663ff1ba522c6f75",
      },
      {
        name: "funny cats",
        messages: [
          {
            text: "hehehaha",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
          {
            text: "hehehaha",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
        ],
      },
    ],
  },
  {
    _id: "63f84cf878b9a5c96f8bf92d",
    name: "Server 2",
    icon: "src/assets/logo.svg",
    users: [{ id: "63f84cf878b9a5c96f8bf92d" }],
    channels: [
      {
        name: "main",
        messages: [
          {
            text: "S2 test",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1674399419301",
            _id: "63f8a100663ff1ba522c6f76",
          },
          {
            text: "S2 test 2",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322122216",
            _id: "63f9e78a147dc574822bec61",
          },
          {
            text: "S2 Test 3",
            user: "63f84cf878b9a5c96f8bf92d",
            time: "1677322222758",
            _id: "63f9e7ee147dc574822bec62",
          },
        ],
        _id: "63f8a0e5663ff1ba522c6f75",
      },
    ],
  },
]);
const currentServer = "63f87660663ff1ba522c6f6f";
const currentChannel = "main";
</script>

<template>
  <div class="flex">
    <div class="flex">
      <ServerList :servers="servers" />
      <ChannelList
        :channels="
          servers.filter((server) => server._id === currentServer)[0].channels
        "
      />
    </div>
    <div class="flex flex-col max-h-screen w-full">
      <MessageList
        :messages="
          servers
            .filter((server) => server._id === currentServer)[0]
            .channels.filter((channel) => channel.name === currentChannel)[0]
            .messages
        "
      />
      <MessageInput />
    </div>
  </div>
</template>
