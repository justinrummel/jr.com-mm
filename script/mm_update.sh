#!/bin/bash

# This script was developed BY Justin Rummel
# ALL scripts are covered by the License found at:
# https://github.com/justinrummel/Random-Scripts/blob/master/LICENSE

# Created by Justin Rummel
# Version 1.0.0 - 2020-6-28

# Modified by
# Version


### Description
# Get latest version of MM standard items

# Base Variables that I use for all scripts.  Creates Log files and sets date/time info
declare -x SCRIPTPATH="${0}"
declare -x RUNDIRECTORY="${0%/*}"
declare -x SCRIPTNAME="${0##*/}"

# Script Variables

# Script Functions
init () {
    cd "${RUNDIRECTORY}"
    cd ../
    echo "LICENSE"
    curl -so LICENSE https://raw.githubusercontent.com/mmistakes/minimal-mistakes/master/LICENSE
    echo "README.md"
    curl -so README.md https://raw.githubusercontent.com/mmistakes/minimal-mistakes/master/README.md
    echo "package.json"
    curl -so package.json https://raw.githubusercontent.com/mmistakes/minimal-mistakes/master/package.json
    echo "CHANGELOG.md"
    curl -so CHANGELOG.md https://raw.githubusercontent.com/mmistakes/minimal-mistakes/master/CHANGELOG.md
}

init
exit 0
