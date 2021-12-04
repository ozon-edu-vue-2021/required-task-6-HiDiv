<template>
  <div>
    <div-table
      :rows="rows"
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

    <div-paginator
        v-if="staticPaging"
        :cur-page="curPage"
        :total-pages="totalPages"
        @set-page="setPage"
    ></div-paginator>

    <div-inf-pager v-else @get-page="infGetPage"></div-inf-pager>
  </div>
</template>

<script>
import DivTable from '@/components/Paging/DivTable.vue';
import DivTableColumn from '@/components/Common/DivTableColumn.vue';
import DivPaginator from '@/components/Paging/DivPaginator.vue';
import DivInfPager from '@/components/Paging/DivInfPager.vue';

export default {
  name: 'PagingWrapper',
  components: {
    'div-table': DivTable,
    'div-table-column': DivTableColumn,
    DivPaginator,
    DivInfPager
  },
  props: {
    staticPaging: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rows: [],
      totalPages: 100,
      curPage: 1
    };
  },
  created() {
    this.blockingPromise = this.getPage(1);
  },
  methods: {
    async getPage(number) {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${number}`);
      this.rows = await res.json();
      this.currentPage = number;
    },
    async setPage(newPage) {
      this.blockingPromise && await this.blockingPromise;
      this.curPage = Math.min(Math.max(1, newPage), this.totalPages);
      await this.getPage(this.curPage);
    },
    async infGetPage() {
      this.blockingPromise && await this.blockingPromise;
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.curPage + 1}`);
      const newRows = await res.json();
      this.rows = [...this.rows, ...newRows];
      this.curPage++;
    }
  },
  watch: {
    staticPaging() {
      this.setPage(1);
    }
  }
}
</script>
