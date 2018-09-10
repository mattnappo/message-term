# Event handler
using terms from application "Messages"
    
    -- set quoted_name to quoted form of "NAME"
    -- set quoted_message to quoted form of "MESSAGE"
    -- set command to "/Applications/Google Chrome.app"
    -- set quoted_command to quoted form of command
    -- set final_command to quoted form of "~/.msgterm/message_term --recieve " & quoted_name & " " & quoted_message & " > ./output.log"
    -- do shell script final_command
    -- do shell script "open " & quoted_command & " 'https://www.google.com/search?q=ran+scrip'"

    on message received this_message from this_buddy for this_chat
		
        set this_name to the name of this_buddy
        set quoted_name to quoted form of this_name
        set quoted_message to quoted form of this_message

        do shell script "~/.msgterm/message_term --recieve " & quoted_name & " " & quoted_message & ""

        -- set this_name to the name of this_buddy
        -- set quoted_name to quoted form of this_name
        -- set quoted_message to quoted form of this_message
        -- set command to "/Applications/Google Chrome.Qapp"
        -- set quoted_command to quoted form of command
        
        -- do shell script "~/.msgterm/message_term --recieve " & quoted_name & " " & quoted_message
        -- do shell script "open " & quoted_command & " 'https://www.google.com/search?q=ran+scrip'"

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