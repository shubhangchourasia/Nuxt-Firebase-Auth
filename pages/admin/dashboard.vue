<template>
  <div class="main">
    <h1 class="h1">
      Admin Dashboard
    </h1>
  </div>
</template>
<script>
export default {
   head() {
    return {
      title: 'Admin Dashboard',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Admin Dashboard',
        },
      ],
    }
  },
}
</script>
<style scoped>
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.h1 {
  font-size: 40px;
  font-family: sans-serif;
}
</style>
