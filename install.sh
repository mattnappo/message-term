if [ -d ./bin ]   # for file "if [-f /home/rama/file]" 
then 
    echo "./bin present"
else
    mkdir ./bin
    echo "./bin created"
fi

if [ -d ~/bin ]   # for file "if [-f /home/rama/file]" 
then 
    echo "~/bin present"
else
    mkdir ~/bin
    echo "~/bin created"
fi

# make handler
# echo "built handler"

cp bin/handler ~/bin
echo "Installed Main Handler"

cp src/Handler.applescript ~/Library/Application\ Scripts/com.apple.iChat
echo "Installed AppleScript Handler"
