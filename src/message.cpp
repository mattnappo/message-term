#include <string>
#include <iostream>
#include <fstream>
#include <iomanip>
#include "vendor/json.hpp"

using namespace std;
using nlohmann::json;

class Message {
private:
    string sender;
    string message;
public:
    Message(string _sender, string _message) {
        sender = _sender;
        message = _message;
    }
    void print_message() {
        cout << "Sender: " << sender << endl;
        cout << "Message: " << message << endl;
    }
    int serialize(string path) {
        json new_msg;
        new_msg["sender"] = sender;
        new_msg["message"] = message;
        ofstream out(path);
        out << setw(4) << new_msg << endl;
        return 0;
    }
    int deserialize(string path) {
        ifstream in(path);
        json new_msg;
        in >> new_msg;
        sender = new_msg["sender"];
        message = new_msg["message"];


        return 0;
    }
        
};

int main() {
    Message *message = new Message("bobby", "hi dude");
    message->print_message();
    message->serialize("./message.json");

    
}
