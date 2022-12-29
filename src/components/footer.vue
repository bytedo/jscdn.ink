<template>
  <footer class="copyright">
    <a target="_blank" href="https://beian.miit.gov.cn/">桂ICP备2022011680号-1</a>
    <span>&copy;Copyright 2022 jscdn.ink </span>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.copyright {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 128px;
  background: var(--color-plain-1);
  color: var(--color-grey-2);

  a {
    margin-bottom: 16px;
  }
}
</style>
