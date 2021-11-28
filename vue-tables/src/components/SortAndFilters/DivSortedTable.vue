<script lang="jsx">
import DivFilterDropdown from "@/components/SortAndFilters/DivFilterDropdown.vue";

export default {
  functional: true,
  name: 'DivSortedTable',
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    sorts: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Object,
      default: () => []
    },
    curFilter: {
      type: String,
      default: ''
    }
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

    function getSortPropsForColumn(colProp) {
      const idx = context.props.sorts.findIndex((sortProp) => sortProp.field === colProp);
      return ~idx ? { idx, desc: context.props.sorts[idx].desc } : null;
    }

    function toggleSort(colProp) {
      context.listeners['toggle-sort'](colProp);
    }

    function renderHead(columnsOptions) {
      const { $style } = context;

      return columnsOptions.map((column) => {
        const renderedTitle = column.scopedSlots.title ? column.scopedSlots.title() : column.title;

        const sortProps = getSortPropsForColumn(column.prop);
        const sortIcon = sortProps === null ? 'sort' : (sortProps.desc ? 'sort-amount-down' : 'sort-amount-up');
        const sortOrder = sortProps === null || context.props.sorts.length < 2 ? '' : sortProps.idx + 1

        const hasFilterSet = !!context.props.filters[column.prop];
        const isFilterShown = column.prop === context.props.curFilter;
        const filterText = context.props.filters[column.prop] ?? '';

        return (
            <th key={column.prop} class={$style.headerCell}>
              <div class={$style.headerCellContent}>
                <span>{renderedTitle}</span>

                <font-awesome-icon
                    class={$style.sortIcon}
                    icon={sortIcon}
                    on={{ click: () => toggleSort(column.prop) }}
                />
                {sortOrder === '' ? '' : <span class={$style.sortOrder}>{sortOrder}</span>}

                <DivFilterDropdown
                    columnProp={column.prop}
                    shown={isFilterShown}
                    filterText={filterText}
                    filterIcon={hasFilterSet ? 'funnel-dollar' : 'filter'}
                    on={{
                      openFilterTooltip: () => context.listeners['set-cur-filter'](column.prop),
                      closeFilterTooltip: () => context.listeners['set-cur-filter'](''),
                      setFilterText: (event) => context.listeners['set-filter-text'](event.target.value),
                    }}
                />
              </div>
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

.headerCellContent {
  display: flex;
  align-items: center;
}

.sortIcon {
  margin-left: 8px;
  margin-right: 24px;
}

.sortIcon:hover {
  cursor: pointer;
}

.sortOrder {
  color: white;
  background-color: black;
  border-radius: 30%;
  width: 18px;
  text-align: center;
  padding: 1px;
  margin-left: -20px;
}
</style>
