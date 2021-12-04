<script lang="jsx">
export default {
  functional: true,
  name: 'DivModeSelect',
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  render(h, context) {
    const { $style, props, listeners } = context;

    const radioButtons = props.options.map((option) => {
      return (
          <div class={$style.itemContainer}>
            <input
                type="radio"
                id={'mode-select-' + option.value}
                name="mode-select" value={option.value}
                checked={option.value === props.value}
                on={{ click: () => listeners.onchange(option.value) }}
                class={$style.radioItem}
            />
            <label class={$style.radioLabel} for={'mode-select-' + option.value}>{option.label}</label>
          </div>
      );
    });

    return <div class={$style.itemsContainer}>{...radioButtons}</div>;
  }
};
</script>

<style module>
.itemsContainer {
  display: flex;
  padding: 16px;
  align-items: center;
  background-color: #c7cbcb;
}
.itemContainer {
  display: flex;
  align-items: center;
  padding-right: 16px;
}
.radioLabel {
  margin-left: 8px;
}
.radioItem {
  margin: 0;
}
</style>
