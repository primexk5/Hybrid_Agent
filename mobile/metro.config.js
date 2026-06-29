const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

const path = require("path");

const config = getDefaultConfig(__dirname);

// ethers v6 ships both ESM (lib.esm) and CJS (lib.commonjs). Metro picks up
// the ESM build via the "browser"/"module" field, but its internal .js-extension
// imports break Metro's resolver. Force Metro to the CJS build instead.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "ethers") {
    return {
      filePath: path.resolve(__dirname, "node_modules/ethers/lib.commonjs/index.js"),
      type: "sourceFile",
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativewind(config, { input: "./global.css" });
