#include <string>
#include <iostream>
#include "vendor/json.hpp"
using namespace std;

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
        

        return 0;
    }
    int deserialize(string path) {
        

        return 0;
    }
        
};

int main() {
    Message *message = new Message("bobby", "hi dude");
    message->print_message();
    message->serialize("./message.json");

    
}
