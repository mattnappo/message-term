#include <iostream>
#include <fstream>
#include <iomanip>
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

int Message::serialize(string path) {
    json new_msg;
    new_msg["sender"] = sender;
    new_msg["message"] = message;
    
    string append_to = deserialize(path).dump();
    string new_msg_s = new_msg.dump();

    ofstream out(path);
    out << setw(4) << new_msg << endl;
    
    return 0;
}

json Message::deserialize(string path) {
    ifstream in(path);
    json new_msg;
    in >> new_msg;
    sender = new_msg["sender"];
    message = new_msg["message"];
    return new_msg
}