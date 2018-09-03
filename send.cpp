#include <string>
#include <iostream>

using namespace std;

int main(int argc, char *argv[]) {
    if (argc == 3) {
        system("bash install.sh");
        cout << " -- INSTALLED -- " << endl;
        
        string phone_num = argv[1];
        string message = argv[2];
        
        string command = "bash SendMessage.sh \"" + phone_num + "\" \"" + message + "\"";
        
        system(command);
    } else {
        printf("usage: send <phone number> <message>\n");
        return 1;
    }
    return 0;
    
}