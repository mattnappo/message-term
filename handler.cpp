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
        string command = "bash ~/bin/SendMessage.sh \"" + number + "\" \"" + message + "\"";
        system(command.c_str());
        cout << "sent '" << message << "' to '" << number << "'" << endl;
        return 0;
    }
    int recieve(string id, string message) {
        return 0;
    }

};

int main(int argc, char *argv[]) {
    Handler *handler = new Handler;
    handler->send(argv[1], argv[2]);
    
}