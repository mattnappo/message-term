#include <iostream>
#include <fstream>
#include <iomanip>
#include <sys/stat.h>

#include "vendor/json.hpp"
#include "message_term.h"
using namespace std;
using nlohmann::json;

Message::Message(string _sender, string _message) {
    sender = _sender;
    message = _message;
}

void Message::print_message() {
    cout << "Sender: " << sender << endl;
    cout << "Message: " << message << endl;
}


inline bool exists(const string &name) {
    struct stat buffer;
    return (stat(name.c_str(), &buffer) == 0); 
}


json Message::serialize(string path) {
    json new_msg;
    new_msg["sender"] = sender;
    new_msg["message"] = message;
    
    if (exists(path) == 0) { // If the file doesn't already exist
        json msg_array;
        msg_array.push_back(new_msg);
        ofstream out(path);
        out << setw(4) << msg_array << endl;
        return new_msg;
    } else {
        json previous_messages = deserialize(path);
        cout << previous_messages << endl;
        json msg_array;
        msg_array.push_back(new_msg);
        
        ofstream out(path);
        out << setw(4) << msg_array << endl;
    }
    
    return new_msg;
}

json Message::deserialize(string path) {
    ifstream in(path);
    json new_msg;
    in >> new_msg;
    sender = new_msg["sender"];
    message = new_msg["message"];
    return new_msg;
}

int main() {
    Message msg("bobasdad", "four");
    json j = msg.serialize("./messages.json");
    cout << j << endl;

    return 0;
}