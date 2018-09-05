#ifndef MESSAGE_TERM_H
#define MESSAGE_TERM_H

#include <string>
using namespace std;

class Message {
private:
    string sender;
    string message;
public:
    Message(string _sender, string _message);
    void print_message();
    int serialize(string path);
    int deserialize(string path);
};



#endif