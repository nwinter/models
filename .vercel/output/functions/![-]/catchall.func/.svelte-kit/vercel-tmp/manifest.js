export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.DruGalih.js",app:"_app/immutable/entry/app.BktoBeJp.js",imports:["_app/immutable/entry/start.DruGalih.js","_app/immutable/chunks/CFS3Jh0B.js","_app/immutable/chunks/CGdeDJmq.js","_app/immutable/chunks/wJ1xGn2g.js","_app/immutable/entry/app.BktoBeJp.js","_app/immutable/chunks/CGdeDJmq.js","_app/immutable/chunks/CZHFYigO.js","_app/immutable/chunks/BwYbQxgg.js","_app/immutable/chunks/wJ1xGn2g.js","_app/immutable/chunks/vADgbPRh.js","_app/immutable/chunks/Cm0A8Yy3.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
