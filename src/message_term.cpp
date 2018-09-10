#include <iostream>
#include "message_term.h"
using namespace std;

int main(int argc, char *argv[]) {
    // system("~/.msgterm/message_term --send 9144142874 \"program_running\"");
    Handler *handler = new Handler(false);

    if (strcmp(argv[1], "--send") == 0) {
        handler->send(argv[2], argv[3]);
    } else if (strcmp(argv[1], "--recieve") == 0) {
        handler->recieve(argv[3], argv[4]);
    } else {
        cout << "usage:\n message_term --send <recipient phone number> <message>" << endl;
        cout << "message_term --recieve <sender name> <message>" << endl;
    }
}