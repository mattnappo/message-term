#!/bin/bash
# Set shell options
shopt -s nocasematch
sender=`echo ${1} | cut -d ':' -f 2`
read line
sendChuckNorrisJoke() {
    message=$(curl -s "http://api.icndb.com/jokes/random" | python -mjson.tool | grep '\"joke\"' \
        | cut -d : -f 2 | sed 's/&quot;/\"/g')
    ${HOME}/bin/SendMessage.sh "${sender}" "${message}"
}
if [[ $line =~ "joke" ]]; then
    sendChuckNorrisJoke
    exit 0
fi
message="I do not understand what you mean."
${HOME}/bin/SendMessage.sh "${sender}" "${message}"
