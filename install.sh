if [ -d ./bin ]   # for file "if [-f /home/rama/file]" 
then 
    echo "./bin present"
else
    mkdir ./bin
    echo "./bin created"
fi

if [ -d ~/.msgterm ]   # for file "if [-f /home/rama/file]" 
then 
    echo "~/.msgterm present"
else
    mkdir ~/.msgterm
    echo "~/.msgterm created"
fi

make message_term
echo "Built Main Handler"

cp bin/message_term ~/.msgterm
echo "Installed Main Handler"

cp src/core/Handler.applescript ~/Library/Application\ Scripts/com.apple.iChat
echo "Installed AppleScript Handler"

cp src/core/sender.sh ~/.msgterm
echo "Installed Send Script"

chmod +x ~/bin/sender.sh
echo "Permissions to Send Script"