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
echo "coped MessageRecieve.sh to bin"
echo "done"
