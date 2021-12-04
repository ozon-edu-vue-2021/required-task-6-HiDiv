<script lang="jsx">
export default {
  functional: true,
  name: 'DivFilterDropdown',
  props: {
    columnProp: {
      type: String,
      default: ''
    },
    shown: {
      type: Boolean,
      default: false
    },
    filterText: {
      type: String,
      default: ''
    },
    filterIcon: {
      type: String,
      default: 'filter'
    }
  },
  render(h, context) {
    const { $style, props, listeners } = context;
    const { shown, filterText, filterIcon } = props;
    const { openFilterTooltip, setFilterText, closeFilterTooltip } = listeners;

    return (
      <VDropdown
        class={$style.filterIcon}
        triggers={[]}
        autoHide={false}
        shown={shown}
      >
        <font-awesome-icon
          icon={filterIcon}
          on={{ click: openFilterTooltip }}
        />

        <div slot="popper">
          <input
            type="text"
            domProps={{ value: filterText }}
            on={{ input: setFilterText }}
          />

          <font-awesome-icon
            icon="times"
            class={$style.closeIcon}
            on={{ click: closeFilterTooltip }}
          />
        </div>
      </VDropdown>
    );
  }
};
</script>

<style module>
  .filterIcon {
    margin-left: auto;
    margin-right: 8px;
  }

  .filterIcon:hover {
    cursor: pointer;
  }

  .closeIcon {
    position: absolute;
    top: 6px;
    right: 6px;
  }

  .closeIcon:hover {
    cursor: pointer;
  }
</style>
