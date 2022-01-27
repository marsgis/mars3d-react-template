import fs from "fs-extra"
import path from "path"
import externalGlobals from "rollup-plugin-external-globals"
import serveStatic from "serve-static"
import { HtmlTagDescriptor, normalizePath, Plugin, UserConfig } from "vite"

interface VitePluginCesiumOptions {
  /**
   * rebuild cesium library, default: false
   */
  rebuildCesium?: boolean
}

function vitePluginCesium(
  options: VitePluginCesiumOptions = {
    rebuildCesium: false
  }
): Plugin {
  const { rebuildCesium } = options

  const cesiumBuildRootPath = "node_modules/mars3d-cesium/Build"
  const cesiumBuildPath = "node_modules/mars3d-cesium/Build/Cesium/"

  let CESIUM_BASE_URL = "/mars3d-cesium/"
  let outDir = "dist"
  let base = "/"
  let isBuild = false

  return {
    name: "vite-plugin-cesium",

    config(c, { command }) {
      isBuild = command === "build"
      if (c.base) {
        base = c.base
        if (base === "") {
          base = "./"
        }
      }
      if (c.build?.outDir) {
        outDir = c.build.outDir
      }
      CESIUM_BASE_URL = path.posix.join(base, CESIUM_BASE_URL)

      const userConfig: UserConfig = {}
      if (!isBuild) {
        // -----------dev-----------
        userConfig.optimizeDeps = {
          exclude: ["mar3d-cesium"]
        }
        userConfig.define = {
          CESIUM_BASE_URL: JSON.stringify(CESIUM_BASE_URL)
        }
      } else {
        // -----------build------------
        if (rebuildCesium) {
          // build 1) rebuild cesium library
          userConfig.build = {
            assetsInlineLimit: 0,
            chunkSizeWarningLimit: 5000,
            rollupOptions: {
              output: {
                intro: `window.CESIUM_BASE_URL = "${CESIUM_BASE_URL}";`
              }
            }
          }
        } else {
          // build 2) copy Cesium.js later
          userConfig.build = {
            rollupOptions: {
              external: ["mar3d-cesium"],
              plugins: [externalGlobals({ cesium: "Cesium" })]
            }
          }
        }
      }
      return userConfig
    },

    configureServer({ middlewares }) {
      const cesiumPath = path.join(cesiumBuildRootPath, "Cesium")
      middlewares.use(CESIUM_BASE_URL, serveStatic(cesiumPath) as any)
    },

    async closeBundle() {
      if (isBuild) {
        try {
          await fs.copy(path.join(cesiumBuildPath, "Assets"), path.join(outDir, "mars3d-cesium/Assets"))
          await fs.copy(path.join(cesiumBuildPath, "ThirdParty"), path.join(outDir, "mars3d-cesium/ThirdParty"))
          await fs.copy(path.join(cesiumBuildPath, "Workers"), path.join(outDir, "mars3d-cesium/Workers"))
          await fs.copy(path.join(cesiumBuildPath, "Widgets"), path.join(outDir, "mars3d-cesium/Widgets"))
          if (!rebuildCesium) {
            await fs.copy(path.join(cesiumBuildPath, "Cesium.js"), path.join(outDir, "mars3d-cesium/Cesium.js"))
          }
        } catch (err) {
          console.error("copy failed", err)
        }
      }
    },

    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = [
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: normalizePath(path.join(CESIUM_BASE_URL, "Widgets/widgets.css"))
          }
        }
      ]
      if (!isBuild) {
        tags.push({
          tag: "script",
          attrs: { src: normalizePath(path.join(base, "mars3d-cesium/Cesium.js")) }
        })
      }
      return tags
    }
  }
}

export default vitePluginCesium
