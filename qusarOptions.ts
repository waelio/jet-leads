export const QuasarOptions = {
  plugins: [
    'AppFullscreen',
    'Dialog',
    'Loading',
    'LoadingBar',
    'BottomSheet',
    'Notify',
  ],
  importStrategy: 'auto',
  extras: {
    font: 'roboto-font',
    fontIcons: ['material-icons'],
    animations: 'all',
  },
  config: {
    dark: false,
  },
  // @ts-expect-error
  components: {
    defaults: {
      QBtn: {
        glossy: true,
      },
    },
  },
}

export default QuasarOptions
