.PHONY: cwb
cwb:
	webpack ./cwb.js -o ./build/cwb.js --output-library cwb \
		--mode production --target web --display-modules
	node build/clean.js
