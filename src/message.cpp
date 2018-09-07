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

json Message::serialize(string path) {
    json new_msg;
    new_msg["sender"] = sender;
    new_msg["message"] = message;
    
    string new_msg_s = new_msg.dump(4);
    string append_to_s = deserialize(path).dump(4);
    string new_json_s = new_msg_s + ",\n" + append_to_s;
    json final_json = json::parse(new_json_s);

    ofstream out(path);
    out << setw(4) << final_json << endl;
    
    return final_json;
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
    Message msg("matt", "hello world");
    msg.serialize("./messages.json");

    return 0;
}