# OBS Control Bundle

Adds a Control Interface for OBS. Requires [obs-websocket](https://github.com/Palakis/obs-websocket) plugin to be installed in OBS. Might work with Streamlabs OBS, unconfirmed.

## Panels

Adds two panels:

* One to the default workspace with the connection details
* One fullbleed panel with the actual controls on

## Setup

Using Git, inside your bundle directory

```
git clone git@github.com:TBSliver/obs-control-bundle.git
cd obs-control-bundle

npm install
npm run build

# Optional - removes build dependencies
npm prune --production
```

Using NodeCG CLI, inside your bundle directory

```
# Installs dev dependencies for building
nodecg install TBSliver/obs-control-bundle --dev
cd obs-control-bundle

npm run build

# Optional - removes build dependencies
npm prune --production
```

Using Pre-built zip

*TODO*