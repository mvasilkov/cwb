.PHONY: cwb
cwb:
	webpack ./cwb.js -o ./build/cwb.js --resolve-alias crypto=./nop.js \
	--mode production --target web --display-modules
