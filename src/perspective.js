import _ from 'lodash';
import CircleOfView from './circle-of-view';
import * as utils from './utils';

window.utils = utils;

const cov = new CircleOfView();

export default class Perspective {
  // Create a new Perspective
  constructor(options) {
    // Pick out the valid options from the passed-in options,
    // then fill in the defaults.
    _.defaults(this, _.pick(options, Perspective.perspectiveOptions), {
      tagName: 'canvas',
      width: 600,
      height: 600,
      count: 10,
      angle: 25,
      colorFn() { return '#333'; },
      strokeColorFn() { return 'rgba(0,0,0,0.4)'; },
    });

    // Make sure that the Perspective has an associated DOM element,
    // then determine if it's an SVG Perspective or a Canvas Perspective
    this._ensureElement();
  }

  // Render the perspective into its element
  render(options = {}) {
    var context = this.el.getContext('2d');

    // Clear the canvas
    this._clearCanvas(context);

    const groundRuler = utils.generateGroundRuler({
      imageWidth: this.width,
      count: this.count,
      padding: 0
    });

    const origin = utils.retrieveOrigin({
      imageWidth: this.width,
      imageHeight: this.height
    });

    const covRadius = utils.covRadiusFromDims({
      imageWidth: this.width,
      imageHeight: this.height,
      angle: this.angle
    });

    const dvps = utils.retrieveDiagonalVanishingPoints({
      imageWidth: this.width,
      imageHeight: this.height,
      covRadius
    });

    _.forEach(groundRuler, p => {
      context.beginPath();
      context.strokeStyle = 'rgba(0,0,0,0.8)';
      context.moveTo(Math.round(origin[0]), Math.round(origin[1]));
      context.lineTo(Math.round(p), this.height);
      context.stroke();

      context.beginPath();
      context.strokeStyle = 'rgba(0,0,0,0.2)';
      context.moveTo(Math.round(dvps.left[0]), Math.round(dvps.left[1]));
      context.lineTo(Math.round(p), this.height);
      context.stroke();

      context.beginPath();
      context.strokeStyle = 'rgba(0,0,0,0.2)';
      context.moveTo(Math.round(dvps.right[0]), Math.round(dvps.right[1]));
      context.lineTo(Math.round(p), this.height);
      context.stroke();
    });

    return this;
  }

  // Make sure that this Perspective has an
  // associated Canvas element
  _ensureElement() {
    if (!this.el) {
      this.el = document.createElement('canvas');
    } else {
      this.el = _.result(this, 'el');
    }

    if (this.el.nodeName.toLowerCase() === 'canvas') {
      this.el.width = this.width;
      this.el.height = this.height;
    }
  }

  // Empty the canvas
  _clearCanvas(context) {
    context.clearRect(0, 0, this.el.width, this.el.height);
  }

  // The options that can be passed into
  // a new Perspective instance
  static get perspectiveOptions() {
    return [
      'tagName', 'fn', 'el', 'width', 'height', 'colorFn', 'strokeColorFn',
      'count', 'angle'
    ];
  }
}
