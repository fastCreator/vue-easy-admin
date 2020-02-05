import store from 'service/iass/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design
setStore()

function isMobile () {
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < WIDTH ? 'mobile' : 'desktop'
}

function setStore () {
  store.registerModule('resize', {
    state: {
      width: body.getBoundingClientRect().width,
      device: isMobile()
    },
    mutations: {
      viewResize (state, device, width) {
        state.device = device
        state.width = width
      }
    }
  })
}

window.addEventListener('resize', () => {
  if (!document.hidden) {
    store.commit('viewResize')
  }
})
