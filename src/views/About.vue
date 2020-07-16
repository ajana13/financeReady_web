<template>
  <div class="About">
    <h1>This is the about page</h1>
    <strong>{{ user.firstName }} {{ user.lastName }}</strong>
    <!-- <h3>{{events[0].bal}}</h3> -->
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {}
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    events: {
      type: Object,
    },
  },
}
</script>
