if [ -d ~/bin ]   # for file "if [-f /home/rama/file]" 
then 
    echo "bin present"
else
    mkdir ~/bin
    echo "bin created"
fi

cp MessageRecieve.applescript ~/Library/Application\ Scripts/com.apple.iChat
echo "copied MessageRecieve.applescript to Library"

cp MessageRecieve.sh ~/bin
echo "copied MessageRecieve.sh to bin"
chmod +x ~/bin/MessageRecieve.sh
echo "x permissions added for MessageRecieve.sh"

cp SendMessage.sh ~/bin
echo "copied SendMessage.sh to bin"

cp bin/send ~/bin
echo "copied send to bin"

echo "done"
