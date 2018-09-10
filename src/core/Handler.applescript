# Event handler
using terms from application "Messages"
    
    
    do shell script "python ~/.msgterm/grab.py 'Price goog'"
    
    on message received theText from theBuddy for theChat
        do shell script "open /Applications/XAMPP/"
        set quoted_message to quoted form of theText
        set quoted_id to quoted form of (id of theBuddy as text)

        do shell script "open /Applications/XAMPP/"
        do shell script "python ~/.msgterm/grab.py 'Price goog'"
        return true
    end message received
    on message sent theMessage for theChat
    end message sent
    on active chat message received
    end active chat message received
    on chat room message received theMessage from theBuddy for theChat
    end chat room message received
    on addressed chat room message received theMessage from theBuddy for theChat
    end addressed chat room message received
    on addressed message received theMessage from theBuddy for theChat
    end addressed message received
    on av chat started
    end av chat started
    on av chat ended
    end av chat ended
    on login finished for theService
    end login finished
    on logout finished for theService
    end logout finished
    on buddy became available theBuddy
    end buddy became available
    on buddy became unavailable theBuddy
    end buddy became unavailable
    on completed file transfer
    end completed file transfer
end using terms from