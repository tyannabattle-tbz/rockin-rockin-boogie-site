// This file tells pnpm to skip all dependency installation
// since this is a pure static HTML site with no dependencies

module.exports = {
  hooks: {
    readPackage(pkg) {
      // Remove all dependencies to prevent installation
      pkg.dependencies = {}
      pkg.devDependencies = {}
      pkg.peerDependencies = {}
      pkg.optionalDependencies = {}
      return pkg
    }
  }
}
