import R from 'ramda'
import h from 'snabbdom/h'
import F from '../../lib'


export default F.def({
  init: ({key}) => ({key}),
  inputs: {},
  actions: {},
  interfaces: {
    view: (ctx, i, m) => h('div', {style: styles.base, key: m.key}, [
      h('div', {style: styles.title}, 'This is a mailbox example with '),
      h('img', {style: styles.textlogo, props: {src: require('../../assets/textlogo.png')}}),
      // --- fractal svg logo (TODO: improve imported svg, remove inkscape stuff!!)
      // TODO: replace with the esher based fractal logo
      // h('svg', {
      //   style: {
      //     width: '620px',
      //     height: '200px',
      //   },
      // }, [
      //   h('g', {attrs: {transform: 'scale(1.2)'}}, [
      //     h('g', {attrs: {transform: 'translate(0,10) scale(0.2)'}}, [
      //       h('text', {attrs: {
      //         'transform': "scale(0.91336746,1.0948496)",
      //         'sodipodi:linespacing': "125%",
      //         'id': "text3374",
      //         'y': "346.44815",
      //         'x': "547.09021",
      //         'style': "font-style:normal;font-weight:normal;font-size:277.35693359px;line-height:125%;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1",
      //         'xml:space': "preserve",
      //       }}, [
      //         h('tspan', {attrs: {
      //           y: "346.44815",
      //           x: "547.09021",
      //           'sodipodi:role': "line",
      //         }}, [
      //           h('tspan', {attrs: {
      //             y: "346.44815",
      //             x: "547.09021",
      //           }}, 'Fractal'),
      //         ])
      //       ]),
      //       h('circle', {attrs: {
      //         r: "21.294472",
      //         cy: "364.08673",
      //         cx: "1321.5686",
      //         style: "opacity:1;fill:#800080;fill-opacity:1;stroke:#000000;stroke-width:0.26001644;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1",
      //       }}),
      //       h('text', {attrs: {
      //         transform: "scale(0.96282292,1.0386126)",
      //         'sodipodi:linespacing': "125%",
      //         y: "360.4368",
      //         x: "1430.349",
      //         style: "font-style:normal;font-weight:normal;font-size:199.02568054px;line-height:125%;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1",
      //         'xml:space': "preserve",
      //       }}, 'JS'),
      //     ]),
      //     h('g', {attrs: {transform: 'translate(0,-100) scale(0.2)'}}, [
      //       h('path', {attrs: {
      //         d: "M 340.12291,604.60793 C 273.19679,623.83501 71.796755,908.42049 61.452514,994.634 c 10.319168,9.7978 57.135676,-7.51133 94.040976,-0.9311 57.75923,-198.56872 212.39546,-399.11082 184.62942,-389.09497 z",
      //         style: "fill:#800080;fill-rule:evenodd;stroke:#000000;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1",
      //       }}),
      //       h('path', {attrs: {
      //         d: "m 270.2769,752.04329 c 40.15567,11.53625 160.99569,182.28754 167.20223,234.01564 -6.1915,5.8787 -34.2814,-4.50679 -56.42458,-0.55866 C 346.39901,866.35904 253.61727,746.03378 270.2769,752.04329 Z",
      //         style: "fill:#800080;fill-rule:evenodd;stroke:#000000;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1",
      //       }}),
      //       h('path', {attrs: {
      //         d: "m 314.92884,850.38311 c -24.09341,6.92175 -96.59742,109.37252 -100.32134,140.40935 3.7149,3.52722 20.56884,-2.70402 33.85475,-0.33516 20.79332,-71.48474 76.46236,-143.6799 66.46659,-140.07419 z",
      //         style: "fill:#800080;fill-rule:evenodd;stroke:#000000;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1",
      //       }}),
      //     ]),
      //   ]),
      // ]),
    // --- svg
    ]),
  }
})

let styles = {
  base: {
    width: '100%',
    height: '100%',
    padding: '10px',
  },
  title: {
    fontSize: '30px',
  },
  fractalSpan: {
    color: 'purple',
  },
  textlogo: {
    width: '300px',
    height: 'auto',
  },
}
