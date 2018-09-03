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

        string phone_num = argv[1];
        string message = argv[2];
        string command = "bash SendMessage.sh \"" + phone_num + "\" \"" + message + "\"";
        
        system(command.c_str());        
    } else {
        printf("usage: send <phone number> <message>\n");
        return 1;
    }
    return 0;
    
}