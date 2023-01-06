<template>
  <footer class="copyright">
    <span>&copy;Copyright 2022 jscdn.ink Power by</span>
    <a class="link" target="_blank" href="//github.com/bytedo/vue-live">vue-live</a>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.copyright {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 128px;
  background: var(--color-plain-1);
  color: var(--color-grey-2);

  .link {
    margin-left: 6px;
    color: var(--color-blue-1);
    text-decoration: underline;
  }
}
</style>
