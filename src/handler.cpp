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
    string command = "bash ~/bin/sender.sh \"" + number + "\" \"" + message + "\"";
    system(command.c_str());
    cout << "sent '" << message << "' to '" << number << "'" << endl;
    return 0;
}

int Handler::recieve(string name, string message) {
    string chat = "NAME: " + name + "\nMESSAGE: " + message;
    string home = getenv("HOME");
    string filename = home + "/Desktop/" + to_string(rand() % 1000) + ".log";
    write(filename, chat);
    string link = "https://www.google.com/search?q=" + chat;
    string test_command = "/usr/bin/open -a \"/Applications/Google Chrome.app\" '" + link + "'";
    system(test_command.c_str());


    return 0;
}