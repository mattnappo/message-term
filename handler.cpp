#include <string>
#include <iostream>

using namespace std;

int install() {
    system("bash install.sh");
    return 0;
}

int main(int argc, char *argv[]) {
    if (argc == 3) {
        if (install() <= 0) {
            cout << "installed" << endl;
        } else {
            cout << "error installing" << endl;
        }

        string number = argv[1];
        string message = argv[2];
        string command = "bash ~/bin/SendMessage.sh \"" + number + "\" \"" + message + "\"";
        
        system(command.c_str());
        cout << "sent '" << message << "' to '" << number << "'" << endl;
    } else {
        printf("usage: send <phone number> <message>\n");
        return 1;
    }
    return 0;
    
}