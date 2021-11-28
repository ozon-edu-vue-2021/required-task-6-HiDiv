<template>
  <div id="app">
    <div class="table-menu">
      <div-mode-select
        :value="mode"
        :options="modeOptions"
        @onchange="changeMode"
      ></div-mode-select>
    </div>

    <SortAndFilterWrapper v-if="mode === 'full-list'"></SortAndFilterWrapper>

    <PagingWrapper
        v-if="mode === 'paging' || mode === 'infinity-scroll'"
        :static-paging="mode === 'paging'"
    ></PagingWrapper>

    <DivVirtualScroll v-if="mode === 'virtual-scroll'"></DivVirtualScroll>
  </div>
</template>

<script>
import DivModeSelect from '@/components/DivModeSelect.vue';
import SortAndFilterWrapper from '@/components/SortAndFilters/SortAndFilterWrapper.vue';
import PagingWrapper from '@/components/Paging/PagingWrapper.vue';
import DivVirtualScroll from '@/components/Virtual/DivVirtualScroll.vue';

export default {
  name: 'App',
  components: {
    DivModeSelect,
    SortAndFilterWrapper,
    PagingWrapper,
    DivVirtualScroll
  },
  data() {
    return {
      modeOptions: [
        { value: 'full-list', label: 'Полный список' },
        { value: 'paging', label: 'Пагинация статическая' },
        { value: 'infinity-scroll', label: 'Бесконечный скролл' },
        { value: 'virtual-scroll', label: 'Виртуальный скролл' }
      ],
      mode: 'full-list'
    };
  },
  methods: {
    changeMode(newMode) {
      this.mode = newMode;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.table-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px;
}
</style>
