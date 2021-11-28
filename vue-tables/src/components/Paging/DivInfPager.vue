<script lang="jsx">
import DotsLoaderIcon from '@/assets/dost-loader.svg';

export default {
  functional: true,
  name: 'DivInfPager',
  render(h, context) {
    const { $style, listeners } = context;

    const directives = [
      {
        name: 'detect-viewport',
        value: {
          callback: listeners['get-page']
        }
      }
    ];

    const style = {
      background: `url("${DotsLoaderIcon}") no-repeat center`
    };

    return <div {...{ class: $style.infPager, style, directives }}></div>;
  }
};
</script>

<style module>
.infPager {
  width: 100%;
  height: 32px;
}
</style>
