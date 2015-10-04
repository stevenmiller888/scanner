
#
# Binaries.
#

BIN := ./node_modules/.bin
ESLINT := $(BIN)/eslint
MOCHA := $(BIN)/mocha

#
# Default.
#

default: node_modules lint

#
# Test.
#

test: node_modules
	@$(MOCHA) test --reporter spec
		
#
# Lint.
#

lint:
	@$(ESLINT) .
	
#
# Lint fix.
#

lint-fix:
	@$(ESLINT) . --fix

#
# Dependencies.
#

node_modules: package.json
	@npm install

#
# Clean.
#

clean:
	@rm -rf *.log
	
#
# Clean dependencies.
#

clean-deps:
	@rm -rf node_modules

#
# Phonies.
#

.PHONY: test lint
