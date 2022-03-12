import * as path from 'path'

/**
 * A route that was created using `defineRoutes` or created conventionally from
 * looking at the files on the filesystem.
 */
export interface ConfigRoute {
  /**
   * The path this route uses to match on the URL pathname.
   */
  path?: string

  /**
   * Should be `true` if it is an index route. This disallows child routes.
   */
  index?: boolean

  /**
   * Should be `true` if the `path` is case-sensitive. Defaults to `false`.
   */
  caseSensitive?: boolean

  /**
   * The unique id for this route, named like its `file` but without the
   * extension. So `app/routes/gists/$username.jsx` will have an `id` of
   * `routes/gists/$username`.
   */
  id: string

  /**
   * The unique `id` for this route's parent route, if there is one.
   */
  parentId?: string

  /**
   * The path to the entry point for this route, relative to
   * `config.appDirectory`.
   */
  file: string
}

export interface RouteManifest {
  [routeId: string]: ConfigRoute
}

export interface DefineRouteOptions {
  /**
   * Should be `true` if the route `path` is case-sensitive. Defaults to
   * `false`.
   */
  caseSensitive?: boolean

  /**
   * Should be `true` if this is an index route that does not allow child routes.
   */
  index?: boolean
}

interface DefineRouteChildren {
  (): void
}

/**
 * A function for defining a route that is passed as the argument to the
 * `defineRoutes` callback.
 *
 * Calls to this function are designed to be nested, using the `children`
 * callback argument.
 *
 *   defineRoutes(route => {
 *     route('/', 'pages/layout', () => {
 *       route('react-router', 'pages/react-router');
 *       route('reach-ui', 'pages/reach-ui');
 *     });
 *   });
 */
export interface DefineRouteFunction {
  (
    /**
     * The path this route uses to match the URL pathname.
     */
    path: string | undefined,

    /**
     * The path to the file that exports the React component rendered by this
     * route as its default export, relative to the `app` directory.
     */
    file: string,

    /**
     * Options for defining routes, or a function for defining child routes.
     */
    optionsOrChildren?: DefineRouteOptions | DefineRouteChildren,

    /**
     * A function for defining child routes.
     */
    children?: DefineRouteChildren,
  ): void
}

export function createRouteId(basePath: string, file: string) {
  return normalizeSlashes(stripFileExtension(file)).replace(
    /^routes\//,
    `routes${basePath}/`,
  )
}

export function normalizeSlashes(file: string) {
  return file.split(path.win32.sep).join('/')
}

function stripFileExtension(file: string) {
  return file.replace(/\.[a-z0-9]+$/i, '')
}

export type DefineRoutesFunction = typeof defineRoutes

function defineRoutes(
  callback: (defineRoute: DefineRouteFunction) => void,
): RouteManifest {
  let manifest: RouteManifest = {}
  return manifest
}
