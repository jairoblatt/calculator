<template>
  <button :class="classes" @click="click">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    primary: Boolean,
    spot: Boolean,
    block: Boolean,
  },
  computed: {
    classes() {
      return {
        btn: true,
        "btn-primary": this.primary,
        "btn-spot": this.spot,
        "w-100": this.block,
      };
    },
  },
  methods: {
    click(e) {
     return  this.$emit("click", e);
    },
  },
};
</script>