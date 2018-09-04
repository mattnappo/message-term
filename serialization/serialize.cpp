#include <iostream>
#include <ostream>
#include <fstream>

using namespace std;

int main() {
    ofstream os;
    os << "hi" << endl;


    fstream f;
    f.write(os);
    f.close

    
    return 0;
}