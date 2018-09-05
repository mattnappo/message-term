#include <string>
#include <ostream>
using namespace std;

class Person {
private:
    string name;
    string race;
public:
    Person(string _name, string _race) {
        name = _name;
        race = _race;
    }
    int serialize() {
        ofstream out;
        

    }
};


int main() {
    Person *bob = new Person("bob", "asian");
    bob->serialize();
}

