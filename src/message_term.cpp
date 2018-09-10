#include <iostream>
#include "message_term.h"
using namespace std;

int main(int argc, char *argv[]) {
    print("MAIN RUNNING");
    Handler *handler = new Handler(false);

    if (strcmp(argv[1], "--send") == 0) {
        handler->send(argv[2], argv[3]);
    } else if (strcmp(argv[1], "--recieve") == 0) {
        handler->recieve(argv[2], argv[3]);
    } else {
        cout << "usage:\n handler --send <recipient phone number> <message>" << endl;
        cout << "handler --recieve <sender name> <message>" << endl;
    }
}