# Event handler
using terms from application "Messages"
    on message received theText from theBuddy for theChat
        set quoted_message to quoted form of theText
        set quoted_id to quoted form of (id of theBuddy as text)
        do shell script "~/bin/handler --recieve 
        # do shell script "~/bin/handler 9144142874 '" & (id of theBuddy as text) & "'"

        # make messages happy
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
