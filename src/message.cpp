#include <iostream>
#include <fstream>
#include <iomanip>
#include <sys/stat.h>

#include "vendor/json.hpp"
#include "message_term.h"
using namespace std;
using nlohmann::json;

void print(string msg) {
    // string prompt = "open \"/Applications/Google Chrome.app\" 'https://www.google.com/search?q='" + msg;
    // system(prompt.c_str());
}

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
    print("called serialize");
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
        json messages = deserialize(path);
        messages.push_back(new_msg);
        ofstream out(path);
        out << setw(4) << messages << endl;
    }
    
    return new_msg;
}

json Message::deserialize(string path) {
    ifstream in(path);
    json new_msg;
    in >> new_msg;
    return new_msg;
}

// int main() {
//     print("test");
//     string home = getenv("HOME");
//     string path = home + "/.msgterm/" + "messages.json";
//     cout << path << endl;
//     Message msg("bob", "how are you");
    
//     json j = msg.serialize(path);

//     return 0;
// }