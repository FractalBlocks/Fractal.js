const R = require('ramda')
const h = require('snabbdom/h')
const F = require('../../lib')

// TODO: Fix this app, now has broken
let stackApp = F.def({
  init: () => ({
    answersState: 'fetching', // fetching, error, success
    page: 1,
    answers: { items: [] },
  }),
  // outputs
  outputNames: [],

  inputs: {
    getMore: (ctx, Action, _) => Action.GetMore(),
    toggleAnswer: (ctx, Action, idx) => Action.ToggleAnswer(idx),
    answersError: (ctx, Action, _) => Action.AnswersError(),
  },

  actions: {
    Answers: [[Object], (answers, m) => R.evolve({
      answersState: R.always('success'),
      answers: R.always(answers)
    }, m)],
    AnswersError: [[], R.evolve({answersState: R.always('error')})],
    ToggleAnswer: [[Number], (idx, m) => R.evolve({ answers: R.evolve({items: R.adjust(R.evolve({open: R.not}), idx)}) }, m)],
    GetMore: [[], m => {
      if (m.answers.has_more)
        return R.evolve({
          answersState: R.always('fetching'),
          page: R.inc,
        }, m)
      else
        return R.evolve({
          answersState: R.always('fetching'),
          page: R.always(1),
        }, m)
    }],
  },
  interfaces: {
    view: (ctx, i, m) => {
      return h('div', { style: styles.base }, [
        h('button', {on: {click: [i.getMore$, undefined]}}, 'Traer mas!!'),
        h('div', {style: {'padding': '10px 10px 10px 20px', 'background-color': 'white'}},
          R.addIndex(R.map)((item, idx) => {
            return h('div', {key: item.answer_id, style: styles.item}, [
              h('div', {
                style: styles.title,
                hook: { insert: vnode => vnode.elm.innerHTML = item.title },
              }),
              h('button', {
                on: {click: [i.toggleAnswer$, idx]},
              }, (item.open) ? 'Ocultar' : 'Mostar'),
              h('a', {
                style: styles.link,
                attrs: {
                  href: 'http://math.stackexchange.com/a/' + item.answer_id,
                  target: '_blank',
                },
              }, 'LINK'),
              h('div', {
                key: 'body',
                style: R.merge(styles.answer, {display: (item.open) ? 'block' : 'none'}),
                hook: { insert: vnode => {
                  vnode.elm.innerHTML = item.body
                } }
              }),
            ])
          }, m.answers.items)
        ),
      ])
    },
    fetch: (ctx, i, m) => {
      return {
        answers: {
          url: 'https://api.stackexchange.com/2.2/answers?page=' + m.page + '&pagesize=10&order=desc&sort=activity&site=math&filter=!-*f(6t0WW)1e',
          options: {
            method: 'get',
          },
          active: m.answersState == 'fetching',
          response: res => res.json(),
          success: i.answers$,
          denied: i.answersError$,
          error: i.answersError$,
          netError: i.answersError$,
        },
      }
    },
  },

})

module.exports = stackApp

let styles = {
  base: {
    fontFamily: "Arial,'Helvetica",
    'padding': '10px 10px 10px 20px',
    margin: '5px',
    'background-color': 'rgb(80, 150, 190)'
  },
  item: {
    margin: '10px',
    padding: '10px',
    backgroundColor: 'rgb(250, 250, 250)',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    lineHeight: '1.3',
  },
  link: {
    marginLeft: '30px',
    fontSize: '14px',
  },
  answer: {
    backgroundColor: 'rgb(240, 240, 250)',
  }
}

