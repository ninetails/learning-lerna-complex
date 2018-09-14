# learning-lerna-complex

> A complex example using Lerna

This example is currently having two repositories: one with a `create-react-app` and another that just outputs components. It is already using **yarn workspaces**.

## Install

With [yarn](https://yarnpkg.org/) and [Lerna](https://lernajs.io/) installed, run

```
$ yarn && yarn bootstrap
```

## What am I really testing on here?

Below is the currently output of running [`lerna la`](https://github.com/lerna/lerna/tree/master/commands/list#lernalist). And this `components` project is being used on my `app` project as a dependency. The `components (dev)` package is marked as private to not being able to be published to a registry but still runs inside babel to transpile it's contents and create a package (Angular publishing like). This project heavily depends on [husky](https://github.com/typicode/husky) for git/npm hooks.

```
@ninestuff/learning-lerna-complex-app            v0.0.0 packages/learning-lerna-complex-app             (PRIVATE)
@ninestuff/learning-lerna-complex-components-dev v0.0.0 packages/learning-lerna-complex-components      (PRIVATE)
@ninestuff/learning-lerna-complex-components     v0.0.0 packages/learning-lerna-complex-components/dist
```

And this is how I am importing a component on my app:

```js
import Button from '@ninestuff/learning-lerna-complex-components/Button'
```

## Hot reload all the things!

You need to run both commands separately:

```
$ yarn components:dev    # build with watch components folder
$ yarn app:start         # app's react-script start
```

## License

MIT

