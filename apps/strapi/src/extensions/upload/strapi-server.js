module.exports = (plugin) => {

  const imageServices = plugin.services['image-manipulation']();
  plugin.services['image-manipulation'] = () => ({
    ...imageServices,
    generateThumbnail: () => null,
    optimize: () => null,
    isSupportedImage: () => null,
    getDimensions: () => null,
    generateResponsiveFormats: () => null,
    isOptimizableImage: () => false,
    isImage: () => false
  });

  return plugin;
};
