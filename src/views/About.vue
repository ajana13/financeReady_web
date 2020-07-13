<template>
  <div class="About">
    <h1>This is the about page</h1>
    <p>
      User name:
      <strong>{{ user.name[0] }}</strong>
      <!-- {{event[0].value}} -->
    </p>
  </div>
</template>

<script>
export default {
  name: 'about',
  props: {
    user: {
      // type: Object,
      // required: true,
    },
  },
  data() {
    return {}
  },
}
</script>
