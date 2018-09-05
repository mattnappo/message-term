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

make handler
echo "built handler"

cp bin/handler ~/bin
echo "Installed Main Handler"

cp src/core/Handler.applescript ~/Library/Application\ Scripts/com.apple.iChat
echo "Installed AppleScript Handler"

cp src/core/sender.sh ~/bin
echo "Installed Send Script"

chmod +x ~/bin/sender.sh
echo "Permissions to Send Script"