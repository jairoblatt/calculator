<template>
  <div class="display">
    <small :class="{ up:history }">{{ history }}</small>
    <span> {{ value }} </span>
  </div>
</template>

<script>
export default {
    props: ['value', 'test'],
    computed:{
      history(){
        let result = this.test.join(' ');
         if(this.test.length > 1) return result.replace(/.$/, "=")
         else return result;
      }
    }
}
</script>