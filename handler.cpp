#include <string>
#include <iostream>

using namespace std;

class Handler {
public:
    Handler() {
        if (install() <= 0) {
            cout << "installed" << endl;
        } else {
            cout << "error installing" << endl;
        }
    }
    int install() {
        system("bash install.sh");
        return 0;
    }
    int send(string number, string message) {
        cout << "send being called" << endl;
        string command = "bash ~/bin/SendMessage.sh \"" + number + "\" \"" + message + "\"";
        system(command.c_str());
        cout << "sent '" << message << "' to '" << number << "'" << endl;
        return 0;
    }
    int recieve(string id, string message) {
        cout << "ID: " << id << endl;
        cout << "MESSAGE: " << message << endl;
        return 0;
    }

};

int main(int argc, char *argv[]) {
    // for (int i = 0; i < 10; i++) {
    //     cout << i << ": " << argv[i] << endl;
    // }
    Handler *handler = new Handler;
    if (strcmp(argv[1], "--send") == 0) {
        handler->send(argv[2], argv[3]);
    } else if (strcmp(argv[1], "--recieve") == 0) {
        handler->recieve(argv[2], argv[3]);
    }
}