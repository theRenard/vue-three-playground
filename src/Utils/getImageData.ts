/* eslint-disable @typescript-eslint/no-non-null-assertion */
export default (image: ImageBitmap): ImageData => {
  const canvas = document.createElement('canvas')!;
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d')!;
  context.drawImage(image, 0, 0);

  return context.getImageData(0, 0, image.width, image.height);
};
