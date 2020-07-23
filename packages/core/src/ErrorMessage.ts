import { inject, h, defineComponent, computed, Ref } from 'vue';
import { normalizeChildren, genFieldErrorId } from './utils';

export const ErrorMessage = defineComponent({
  props: {
    as: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      default: undefined,
    },
  },
  setup(props, ctx) {
    const errors = (inject('$_veeFormErrors', undefined) as unknown) as Ref<Record<string, string>>;
    const message = computed<string | undefined>(() => {
      let message = errors.value[props.name];
      if (props.displayName && message) {
        message = message.replace(props.name, props.displayName);
      }

      return message;
    });

    return () => {
      const children = normalizeChildren(ctx, {
        message: message.value,
      });

      const tag = props.as;
      const attrs = {
        id: genFieldErrorId(props.name),
        role: 'alert',
      };

      // If no tag was specified and there are children
      // render the slot as is without wrapping it
      if (!tag && children.length) {
        return children;
      }

      // If no children in slot
      // render whatever specified and fallback to a <span> with the message in it's contents
      if (!children.length) {
        return h(tag || 'span', attrs, message.value);
      }

      return h(
        tag,
        {
          ...attrs,
          ...ctx.attrs,
        },
        children
      );
    };
  },
});
