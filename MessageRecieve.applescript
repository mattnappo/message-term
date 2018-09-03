# Event handler
using terms from application "Messages"
    on message received this_message from this_buddy for this_chat
		
        set this_name to the name of this_buddy
		do shell script "~/bin/handler --send 9144142874 '" & this_name & "'"
        if the name of this_buddy is in {"Kayla Vares"} then
        
			set canned_responses to {"Oh, I know!", "I was just thinking about that.", "Maybe tomorrow.", "Seems logical."}
			set this_response to some item of the canned_responses
			send this_response to this_chat
		end if

        if this_name is in {"Henry Shatcz"} then
            
			set canned_responses to {"Hi henry 0", "hi henry 1.", "hi henry 2", "hi henry 3."}
			set this_response to some item of the canned_responses
            do shell script "~/bin/handler --send 9148886530 '" & this_name & this_response & "'"
			send this_response to this_chat
		end if

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