
// Proposed template (TODO: coplete this)

h('input', {
  style: styles.sendView.textinput.c(m.titleText.focused),
  on: {
    change: ev => i.textinputChange('titleText', 'value', ev.target.value),
    focus: ev => i.textinputChange('titleText', 'focused', true),
    blur: ev => i.textinputChange('titleText', 'focused', false),
  },
}),
