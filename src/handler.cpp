#include <string>
#include <iostream>
#include <fstream>
using namespace std;

void test() {
    string home = getenv("HOME");
    string cmd = home + "/bin/handler --send 9144142874 test_message";
    system(cmd.c_str());
}

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