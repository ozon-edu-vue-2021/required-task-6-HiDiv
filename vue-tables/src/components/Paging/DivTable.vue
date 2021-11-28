<script lang="jsx">
export default {
  functional: true,
  name: 'DivTable',
  props: {
    rows: {
      type: Array,
      default: () => []
    },
  },
  render(h, context) {
    function getColumnOptions() {
      return context.children.
        filter(item => item.componentOptions && item.componentOptions.tag === 'div-table-column').
        map(column =>
            Object.assign({}, column.componentOptions.propsData, {
                  scopedSlots: column.data.scopedSlots || {}
                }
            )
        );
    }

    function renderHead(columnsOptions) {
      const { $style } = context;

      return columnsOptions.map((column) => {
        const renderedTitle = column.scopedSlots.title ? column.scopedSlots.title() : column.title;

        return (
            <th key={column.prop} class={$style.headerCell}>
              {renderedTitle}
            </th>
        );
      });
    }

    function renderColumns(row, columnsOptions) {
      return columnsOptions.map((column) => {
        return (
            <td key={column.prop} class={context.$style.cell}>
              {column.scopedSlots.body ? column.scopedSlots.body({ row }) : row[column.prop]}
            </td>
        );
      });
    }

    function renderRows(columnsOptions) {
      return context.props.rows.map((row, index) => {
        return <tr key={row.id || index}>{...renderColumns(row, columnsOptions)}</tr>;
      });
    }

    const columnsOptions = getColumnOptions();
    const columnsHead = renderHead(columnsOptions);
    const rows = renderRows(columnsOptions);

    return (
        <table class={context.$style.table}>
          <thead>{...columnsHead}</thead>
          <tbody>{...rows}</tbody>
        </table>
    );
  }
}
</script>

<style module>
.table {
  border-spacing: 0;
  margin: 8px;
  width: 100%;
}

.cell {
  text-align: left;
  border-bottom: 1px solid #c8cacc;
  padding: 1rem 1rem;
}

.headerCell {
  composes: cell;
  background: #c7cbcb;
}
</style>
