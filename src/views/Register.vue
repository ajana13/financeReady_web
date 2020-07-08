<template>
  <div class="register">
    <h1>Registration Page</h1>
    <app-form />
  </div>
</template>

<script>
import AppForm from '../components/AppForm.vue'

export default {
  name: 'Register',
  components: {
    AppForm,
  },
}
</script>

<style>
</style>