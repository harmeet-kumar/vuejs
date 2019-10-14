<template>
  <a
    href="#"
    @click="tagSelected"
    :class="{ disabled: disable }"
    class="tag-pill tag-default"
    >{{ tag }}</a
  >
</template>
<script>
export default {
  props: ["tag", "disable"],
  methods: {
    tagSelected() {
      this.$emit("click");
    }
  }
};
</script>
