#include <string>
#include <iostream>
#include <fstream>
using namespace std;

class Handler {
public:
    Handler(bool auto_install) {
        if (auto_install) {
            if (this->auto_install() <= 0) {
                cout << "installed" << endl;
            } else {
            cout << "error installing" << endl;
            }
        }
        
    }
    int write(string filename, string text) {
        try {
            ofstream file;
            file.open(filename);
            file << text;
            file.close();
            cout << "wrote to file" << endl;
            return 0;
        } catch (int e) {
            cout << "error writing to file. error code: " << e << endl;
            return 1;
        }
    }
    int auto_install() {
        try {
            system("bash install.sh");
            return 0;
        } catch (int e) {
            cout << "installation failed. error code: " << e << endl;
            return 1;
        }
        
    }
    int send(string number, string message) {
        string command = "bash ~/bin/sender.sh \"" + number + "\" \"" + message + "\"";
        system(command.c_str());
        cout << "sent '" << message << "' to '" << number << "'" << endl;
        return 0;
    }
    int recieve(string name, string message) {
        string chat = "NAME: " + name + "\nMESSAGE: " + message;
        string home = getenv("HOME");
        write(home + "/Desktop/test.log", chat);
        
        return 0;
    }

};

void test() {
    string home = getenv("HOME");
    string cmd = home + "/bin/handler --send 9144142874 please_work";
    system(cmd.c_str());
}

int main(int argc, char *argv[]) {
    Handler *handler = new Handler(true);
    test();

    if (strcmp(argv[1], "--send") == 0) {
        handler->send(argv[2], argv[3]);
    } else if (strcmp(argv[1], "--recieve") == 0) {

        handler->recieve(argv[2], argv[3]);
        
    } else {
        cout << "usage:\n handler --send <recipient phone number> <message>" << endl;
        cout << "handler --recieve <sender name> <message>" << endl;
    }
}