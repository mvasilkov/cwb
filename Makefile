.PHONY: cwb
cwb:
	tsc
	webpack ./javascript/cwb.js -o ./build/cwb.js --output-library cwb \
		--output-library-target=umd \
		--module-bind js=babel-loader \
		--mode production --target web --display-modules
	node build/clean.js
