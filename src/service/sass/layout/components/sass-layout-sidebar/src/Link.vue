<script>
const isExternal = function (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default {
  functional: true,
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render (h, context) {
    const { props: { to }, children } = context
    if (isExternal(to)) {
      return h('a', {
        attrs: {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }, children)
    } else {
      return h('router-link', { props: { to: `/redirect/local/${to}` } }, children)
    }
  }
}

</script>
