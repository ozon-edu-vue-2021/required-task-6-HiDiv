<script lang="jsx">
export default {
  functional: true,
  name: 'DivPaginator',
  props: {
    curPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    }
  },
  render(h, context) {
    const { $style, props, listeners } = context;
    const toBeginClasses = { [$style.pageItem]: true, [$style.disabled]: props.curPage < 2 };
    const toEndClasses = { [$style.pageItem]: true, [$style.disabled]: props.curPage >= props.totalPages };

    return (
        <ul class={$style.pagination}>
          <li class={toBeginClasses}>
            <a class={$style.pageLink} href="#" on={{ click: () => listeners['set-page'](1) }}>
              <span>&laquo;</span>
            </a>
          </li>

          <li class={toBeginClasses}>
            <a class={$style.pageLink} href="#" on={{ click: () => listeners['set-page'](props.curPage - 1) }}>
              <span>&lt;</span>
            </a>
          </li>

          <li className={$style.pageItem}>
            <span class={$style.pageInfo}>Страница {props.curPage} из {props.totalPages}</span>
          </li>

          <li class={toEndClasses}>
            <a class={$style.pageLink} href="#" on={{ click: () => listeners['set-page'](props.curPage + 1) }}>
              <span>&gt;</span>
            </a>
          </li>

          <li class={toEndClasses}>
            <a class={$style.pageLink} href="#" on={{ click: () => listeners['set-page'](props.totalPages) }}>
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
    );
  }
}
</script>

<style module>
.pagination {
  display: flex;
  margin: 0;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}
.pageItem:first-child .pageLink {
  margin-left: 0;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.pageItem:last-child .pageLink {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.pageItem.disabled {
  pointer-events: none;
  cursor: auto;
}
.pageInfo {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #2c3e50;
  background-color: #fff;
  border: 1px solid #c8cacc;
}
.pageLink {
  composes: pageInfo;
  text-decoration: none;
}
.pageLink:hover {
  z-index: 2;
  color: #313d49;
  text-decoration: none;
  background-color: #e9ecef;
  border-color: #c8cacc;
}
</style>
