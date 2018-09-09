#include <string.h>
#include <string>
using namespace std;

int main(int argc, char *argv[]) {
    if (strcmp(argv[1], "p") != 0) {
        system("git add .");
    
        string *thing = new string(argv[1]);
        string command = "git commit -m \"" + *thing + "\"";
        system(command.c_str());
    } else {
        system("git push origin serialization");
    }
    
}