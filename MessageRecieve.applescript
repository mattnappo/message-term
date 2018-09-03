# Event handler
using terms from application "Messages"
    on message received this_message from this_buddy for this_chat
        set quoted_message to quoted form of this_message
        set quoted_id to quoted form of (id of this_buddy as text)
        

        # do shell script "~/bin/handler --recieve " & quoted_id & " " & quoted_message & " > ~/Desktop/test.log"
        # do shell script "~/bin/handler --send 9144142874 " & quoted_message
        do shell script "echo " & quoted_message & " > ~/Desktop/test.log"

        return true
    end message received
    on message sent theMessage for this_chat
    end message sent
    on active chat message received
    end active chat message received
    on chat room message received theMessage from this_buddy for this_chat
    end chat room message received
    on addressed chat room message received theMessage from this_buddy for this_chat
    end addressed chat room message received
    on addressed message received theMessage from this_buddy for this_chat
    end addressed message received
    on av chat started
    end av chat started
    on av chat ended
    end av chat ended
    on login finished for theService
    end login finished
    on logout finished for theService
    end logout finished
    on buddy became available this_buddy
    end buddy became available
    on buddy became unavailable this_buddy
    end buddy became unavailable
    on completed file transfer
    end completed file transfer
end using terms from
