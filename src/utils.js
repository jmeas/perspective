import _ from 'lodash';

// This returns the radius, in pixels, of the circle that circumscribes the
// rectangular canvas. This circle is important because it is either the 90
// circle of view or a subset of it.
// imageWidth and imageHeight are the dimensions of the canvas.
export function radiusFromDimensions({imageWidth, imageHeight} = {}) {
  return 0.5 * Math.sqrt(imageWidth ** 2 + imageHeight ** 2);
}

// canvasRadius: the result of `radiusFromDimensions`.
// angle: the angle of view, in radians, that this canvas displays. A common
//   radius is 25 degrees. 90 degrees would be a image that is supposed to take
//   up the viewer's entire field of view.
// This returns the viewing distance of the image. This viewing distance is
// *also* the radius of the 90 degree circle of view for this canvas.
// This can be used to position the diagonal vanishing points in one point
// perspective.
export function radiusOfCircleOfView({canvasRadius, angle} = {}) {
  // The angle must be between 0 and 90 degrees. 0 represents an image
  // that is infinitely far away, and takes up none of your field of vision.
  // 90 represents an image that takes up your entire field of vision.
  if (angle < 0 || angle > 90) {
    throw new Error('The angle must be between 0 and 90 degrees');
  }
  // The "circle of view" refers to the entire angle that the cone of vision
  // makes, yet the equations we're using (basically the Pythagorean theorem)
  // require us to use half that value.
  const halfAngle = angle / 2;
  const angleInRadians = halfAngle * Math.PI / 180;
  return canvasRadius / Math.tan(angleInRadians);
}

// imageWidth: The x dimension of the image plane
// imageHeight: The y dimension of the image plane
// angle: The angle of the desired circle of view (must be between 0 and 90)
// This retrieves the radius,i
export function covRadiusFromDims({imageWidth, imageHeight, angle} = {}) {
  const radiusFromDims = radiusFromDimensions({imageWidth, imageHeight});
  return radiusOfCircleOfView({canvasRadius: radiusFromDims, angle});
}

export function retrieveOrigin({imageWidth, imageHeight}) {
  return [imageWidth / 2, imageHeight / 2];
}

// Returns the location, in pixels, of the diagonal vanishing points
export function retrieveDiagonalVanishingPoints({imageWidth, imageHeight, covRadius} = {}) {
  const height = imageHeight / 2;
  const baseWidth = imageWidth / 2;
  const leftX = baseWidth - covRadius;
  const rightX = baseWidth + covRadius;
  return {
    left: [leftX, height],
    right: [rightX, height]
  };
}

// Returns the points for the ground ruler
export function generateGroundRuler({count, imageWidth, padding = 0}) {
  const interval = imageWidth / (count);
  const totalCount = count + 1 + padding * 2;
  const offsetLeft = interval * padding;
  return _.times(totalCount, n => n * interval - offsetLeft);
}
