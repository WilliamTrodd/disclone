<script setup lang="ts"></script>

<template>
  <div class="flex flex-col w-3/4 max-w-md m-auto">
    <h1 class="text-3xl text-center text-dc-blue-800">Login</h1>
    <form class="flex flex-col">
      <input
        placeholder="email"
        class="p-2 m-2 border-2 border-dc-blue-800 rounded-md"
      />
      <input
        placeholder="password"
        class="p-2 m-2 border-2 border-dc-blue-800 rounded-md"
      />
      <div class="flex flex-row justify-around mt-4">
        <button class="bg-dc-blue-800 py-2 px-4 rounded-md text-dc-grey-800">
          Login
        </button>
        <button class="bg-dc-blue-800 py-2 px-4 rounded-md text-dc-grey-800">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
