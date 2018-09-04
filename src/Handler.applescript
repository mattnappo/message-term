# Event handler
using terms from application "Messages"
    on message received this_message from this_buddy for this_chat
		
        set this_name to the name of this_buddy
        set quoted_name to quoted form of this_name
        set quoted_message to quoted form of this_message

        do shell script "~/bin/handler --recieve " & quoted_name & " " & quoted_message 

        return true
    end message received

end using terms from