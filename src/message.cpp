#include <string>
#include <iostream>
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
        
};

int main() {
    Message *message = new Message("bobby", "hi dude");
    message->print_message();
    
}
