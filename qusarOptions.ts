export const QuasarOptions = {
  plugins: [
    'AppFullscreen',
    'Dialog',
    'BottomSheet',
    'Notify',
  ],
  importStrategy: 'auto',
  extras: {
    fontIcons: ['material-icons'],
    animations: 'all',
  },
  config: {
    dark: false,
  },
  components: {
    defaults: {
      QBtn: {
        glossy: true,
      },
    },
  },
}

export default QuasarOptions
