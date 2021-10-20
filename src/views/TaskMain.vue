import { mapActions } from 'vuex';
<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'TaskMain',
}
</script>

<style lang="sass">

  .main
   width: 100%
   min-height: 700px
   padding-top: 50px

  @media (max-width: 530px)
    .main
      padding-top: 0

</style>