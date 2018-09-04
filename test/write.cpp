#include <string>
#include <iostream>
#include <fstream>
using namespace std;

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

int main(int argc, char *argv[]) {
    string name = "matt";
    string message = "hi dude";
    string chat = "NAME: " + name + "\nMESSAGE: " + message;
    write("/home/Desktop/test.log", chat);
}