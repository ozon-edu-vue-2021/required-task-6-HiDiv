<template>
  <div-table
      :rows="rows"
      :sorts="sorts"
      :filters="filters"
      :cur-filter="curFilter"
      @toggle-sort="toggleSort"
      @set-cur-filter="setCurFilter"
      @set-filter-text="setFilterText"
  >
    <div-table-column prop="id" title="ID" />
    <div-table-column prop="postId" title="Post ID" />

    <div-table-column prop="email">
      <template #title>
        <b>Email</b>
      </template>

      <template #body="{ row }">
        <a :href="`mailto:${row.email}`">{{ row.email }}</a>
      </template>
    </div-table-column>

    <div-table-column prop="name" title="Name" />
  </div-table>
</template>

<script>
import DivSortedTable from '@/components/SortAndFilters/DivSortedTable.vue';
import DivTableColumn from '@/components/Common/DivTableColumn.vue';

import {orderBy} from "lodash/collection";

export default {
  name: 'SortAndFilterWrapper',
  components: {
    'div-table': DivSortedTable,
    'div-table-column': DivTableColumn
  },
  data() {
    return {
      rawRows: [],
      sorts: [],
      filters: {},
      curFilter: ''
    };
  },
  async created() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
    this.rawRows = await res.json();
  },
  methods: {
    toggleSort(colProp) {
      const idx = this.sorts.findIndex((item) => item.field === colProp);
      if (idx < 0) {
        this.sorts.push({field: colProp, desc: false});
      } else if (this.sorts[idx].desc === false) {
        this.sorts[idx].desc = true;
      } else {
        this.sorts.splice(idx, 1);
      }
    },
    setCurFilter(colProp) {
      this.curFilter = colProp;
      if (this.curFilter !== '' && typeof (this.filters[this.curFilter]) !== 'string') {
        this.$set(this.filters, this.curFilter, '');
      }
    },
    setFilterText(text) {
      if (this.curFilter !== '' && typeof (this.filters[this.curFilter]) === 'string') {
        this.filters[this.curFilter] = text;
      }
    },
  },
  computed: {
    rows() {
      const filteredRows = this.rawRows.filter((row) => {
        for (const field in this.filters) {
          if (this.filters[field] !== '' && row[field].toString().search(this.filters[field]) < 0) {
            return false;
          }
        }
        return true;
      });

      const sortProp = this.sorts.map((sortItem) => sortItem.field);
      const sortDir = this.sorts.map((sortItem) => sortItem.desc ? 'desc' : 'asc');
      return this.sorts.length === 0 ? filteredRows : orderBy(filteredRows, sortProp, sortDir);
    }
  }
}
</script>
