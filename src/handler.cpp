#include <string>
#include <iostream>
#include <fstream>
#include "message_term.h"
using namespace std;

void test() {
    string home = getenv("HOME");
    string cmd = home + "/bin/handler --send 9144142874 test successfull";
    system(cmd.c_str());
}

Handler::Handler(bool auto_install) {
    if (auto_install) {
        if (this->auto_install() <= 0) {
            cout << "installed" << endl;
        } else {
            cout << "error installing" << endl;
        }
    }
}

int Handler::write(string filename, string text) {
    try {
        ofstream file;
        file.open(filename);
        file << text;
        file.close();
        cout << "wrote to " << filename << endl;
        return 0;
    } catch (int e) {
        cout << "error writing to file. error code: " << e << endl;
        return 1;
    }
}

int Handler::auto_install() {
    try {
        system("bash install.sh");
        return 0;
    } catch (int e) {
        cout << "installation failed. error code: " << e << endl;
        return 1;
    }
}

int Handler::send(string number, string message) {
    string command = "bash ~/.msgterm/sender.sh \"" + number + "\" \"" + message + "\"";
    system(command.c_str());
    cout << "sent '" << message << "' to '" << number << "'" << endl;
    return 0;
}

int Handler::recieve(string name, string message) {
    Message msg(name, message);
    string home = getenv("HOME");
    string path = home + ".msgterm/" + "messages.json";
    msg.serialize(path);

    return 0;
}