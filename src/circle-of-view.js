export default class CircleOfView {
  constructor(options) {
    _.defaults(this, _.pick(options, CircleOfView.perspectiveOptions), {
      tagName: 'canvas',
      width: 600,
      height: 600,
      colorFn() { return '#333'; },
      strokeColorFn() { return 'rgba(0,0,0,0.4)'; },
    });
    console.log('u made 1');
  }

  // The options that can be passed into
  // a new Perspective instance
  static get options() {
    return [
      'angle'
    ];
  }
}
