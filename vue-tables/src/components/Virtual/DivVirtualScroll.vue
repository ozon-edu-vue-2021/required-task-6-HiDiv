<template>
  <RecycleScroller
      :class="$style.scroller"
      :items="rows"
      :item-size="55"
      :buffer="500"
      page-mode
      key-field="id"
      v-slot="{ item }"
  >
    <DivVirtualItem :item="item" />
  </RecycleScroller>
</template>

<script>
import DivVirtualItem from '@/components/Virtual/DivVirtualItem.vue';

export default {
  name: 'DivVirtualScroll',
  components: {
    DivVirtualItem
  },
  data() {
    return {
      rows: []
    };
  },
  async created() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
    this.rows = await res.json();
  }
}
</script>

<style module>
.scroller {
  text-align: left;
  margin: 24px;
}
</style>
