import inject from "@rollup/plugin-inject";
import includePaths from "rollup-plugin-includepaths";

const injectOptions = { prismic: "prismic.config.js" };

const includePathOptions = {
	include: {},
	paths: ["."],
	external: [],
	extensions: [".js"],
};

const name = { name: "rollup-plugin-inject-prismic" };

const injectPrismic = (): any =>
	Object.assign(inject(injectOptions), includePaths(includePathOptions), name);

export default injectPrismic;
